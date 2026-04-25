import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import type { File as PayloadFile } from 'payload'

import config from '@payload-config'
import type { Product } from '@/payload-types'

export const runtime = 'nodejs'

const SLIP_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])

type CheckoutItemInput = {
  id: string
  slug: string
  quantity: number
}

type ErrorBody = { success: false; error: string }
type SuccessBody = { success: true; orderId: string }

function jsonError(message: string, status: number): NextResponse<ErrorBody> {
  return NextResponse.json({ success: false, error: message }, { status })
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim() !== ''
}

function isValidEmail(v: string): boolean {
  const s = v.trim()
  if (s.length < 3 || s.length > 320) return false
  // pragmatic check; Payload will store as email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

function isPurchasableProduct(p: Product): p is Product & { price: number } {
  return p.mode === 'buy' && typeof p.price === 'number' && Number.isFinite(p.price) && p.price > 0
}

function parseItemsJson(raw: string): CheckoutItemInput[] | null {
  let data: unknown
  try {
    data = JSON.parse(raw) as unknown
  } catch {
    return null
  }
  if (!Array.isArray(data) || data.length === 0) return null
  const out: CheckoutItemInput[] = []
  for (const row of data) {
    if (!row || typeof row !== 'object') return null
    const o = row as Record<string, unknown>
    if (typeof o.id !== 'string' || typeof o.slug !== 'string') return null
    const q = o.quantity
    if (typeof q !== 'number' || !Number.isInteger(q) || q < 1) return null
    out.push({ id: o.id.trim(), slug: o.slug.trim(), quantity: q })
  }
  return out
}

async function findProductByIdOrSlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  id: string,
  slug: string,
): Promise<Product | 'mismatch' | null> {
  if (id.length > 0) {
    try {
      const doc = (await payload.findByID({
        collection: 'products',
        id,
        overrideAccess: true,
      })) as Product | null
      if (doc) {
        if (slug && doc.slug !== slug) return 'mismatch'
        return doc
      }
    } catch {
      // invalid id or not found — try slug
    }
  }
  if (!slug) return null
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })
  return (res.docs[0] as Product | undefined) ?? null
}

export async function POST(request: Request): Promise<NextResponse<SuccessBody | ErrorBody>> {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return jsonError('Invalid form data.', 400)
  }

  const customerName = form.get('customerName')
  const email = form.get('email')
  const itemsRaw = form.get('items')
  const slip = form.get('slip')

  if (!isNonEmptyString(customerName)) {
    return jsonError('Customer name is required.', 400)
  }
  if (!isNonEmptyString(email) || !isValidEmail(email)) {
    return jsonError('A valid email is required.', 400)
  }
  if (!(slip instanceof File) || slip.size < 1) {
    return jsonError('A payment slip file is required.', 400)
  }
  if (typeof itemsRaw !== 'string' || itemsRaw.trim() === '') {
    return jsonError('Order items (items JSON) are required.', 400)
  }

  const inputItems = parseItemsJson(itemsRaw)
  if (inputItems === null) {
    return jsonError('Items must be a non-empty JSON array of { id, slug, quantity }.', 400)
  }

  const mimetype = slip.type || 'application/octet-stream'
  if (!SLIP_MIME.has(mimetype)) {
    return jsonError('Slip file type is not allowed. Use JPEG, PNG, WebP, or PDF.', 400)
  }

  const phoneRaw = form.get('phone')
  const addressRaw = form.get('address')
  const customerNoteRaw = form.get('customerNote')
  const phone = typeof phoneRaw === 'string' ? phoneRaw.trim() : ''
  const address = typeof addressRaw === 'string' ? addressRaw.trim() : ''
  const customerNote = typeof customerNoteRaw === 'string' ? customerNoteRaw.trim() : ''

  const buffer = Buffer.from(await slip.arrayBuffer())
  if (buffer.length < 1) {
    return jsonError('A payment slip file is required.', 400)
  }

  const fileForPayload: PayloadFile = {
    data: buffer,
    mimetype,
    name: slip.name && slip.name.length > 0 ? slip.name : 'payment-slip',
    size: buffer.length,
  }

  const alt = `Payment slip for ${email.trim()}`

  const payload = await getPayload({ config })

  const lineItemSnapshots: {
    productId: string
    slug: string
    title: string
    quantity: number
    unitPrice: number
    lineTotal: number
  }[] = []

  for (const line of inputItems) {
    const product = await findProductByIdOrSlug(payload, line.id, line.slug)
    if (product === 'mismatch') {
      return jsonError('Product data for one or more lines is inconsistent.', 400)
    }
    if (!product) {
      return jsonError('One or more products could not be found.', 400)
    }
    if (!isPurchasableProduct(product)) {
      return jsonError('One or more products are not available for purchase.', 400)
    }
    const unitPrice = product.price
    const lineTotal = unitPrice * line.quantity
    if (!Number.isFinite(lineTotal)) {
      return jsonError('Invalid line total for one or more products.', 400)
    }
    lineItemSnapshots.push({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      quantity: line.quantity,
      unitPrice,
      lineTotal,
    })
  }

  const subtotal = lineItemSnapshots.reduce((sum, row) => sum + row.lineTotal, 0)
  if (!Number.isFinite(subtotal) || subtotal <= 0) {
    return jsonError('Order total could not be calculated.', 400)
  }

  let slipDocId: string | null = null
  try {
    const slipDoc = await payload.create({
      collection: 'payment-slips',
      data: { alt },
      file: fileForPayload,
      overrideAccess: true,
    })
    slipDocId = slipDoc.id

    const order = await payload.create({
      collection: 'orders',
      data: {
        status: 'awaiting_verification',
        paymentMethod: 'bank_transfer',
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone || undefined,
        address: address || undefined,
        customerNote: customerNote || undefined,
        currency: 'THB',
        subtotal,
        lineItems: lineItemSnapshots,
        slip: slipDocId,
      },
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (err) {
    if (slipDocId) {
      try {
        await payload.delete({
          collection: 'payment-slips',
          id: slipDocId,
          overrideAccess: true,
        })
      } catch {
        // best-effort cleanup
      }
    }
    const message = err instanceof Error ? err.message : String(err)
    console.error('[checkout]', message)
    return jsonError('Checkout could not be completed. Please try again later.', 500)
  }
}
