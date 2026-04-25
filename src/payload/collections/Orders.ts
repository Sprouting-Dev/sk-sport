import { render } from '@react-email/components'
import type { CollectionConfig, Payload } from 'payload'

import type { Order, PaymentSetting, PaymentSlip } from '@/payload-types'
import { OrderConfirmationEmail } from '../../emails/OrderConfirmation'
import { OrderNotificationEmail, type LineItemRow } from '../../emails/OrderNotification'

const ORDER_NOTIFY_FALLBACK = 'saseewirun@sksporttrading.com'

function formatLogErr(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
}

/**
 * Public site / API origin for absolutizing file URLs in outbound emails.
 * Order: NEXT_PUBLIC_SERVER_URL → PAYLOAD_PUBLIC_SERVER_URL → https://VERCEL_URL → local dev.
 */
function getServerBaseUrl(): string {
  const fromNext = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (fromNext) return fromNext.replace(/\/$/, '')

  const fromPayload = process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim()
  if (fromPayload) return fromPayload.replace(/\/$/, '')

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '').replace(/\/$/, '')
    return `https://${host}`
  }

  return 'http://localhost:3000'
}

/**
 * Owner email: Payload may store upload URLs as site-relative (`/api/...`), which break in mail clients.
 * Absolute `http://` / `https://` URLs are left unchanged.
 */
function absolutizeSlipUrlForEmail(url: string | null): string | null {
  if (url == null) return null
  const u = url.trim()
  if (u === '') return null
  if (/^https?:\/\//i.test(u)) return u
  if (u.startsWith('/')) {
    const base = getServerBaseUrl()
    return `${base.replace(/\/$/, '')}${u}`
  }
  return u
}

type ResolveOrderOwnerNotifyResult = {
  to: string
  usedPaymentSettingsOrderNotificationEmail: boolean
}

/**
 * Order notification “owner” address:
 * 1) PaymentSettings.orderNotificationEmail (if set)
 * 2) process.env.ORDER_NOTIFY_EMAIL
 * 3) static business fallback
 */
async function resolveOrderOwnerNotifyTo(req: {
  payload: Payload
}): Promise<ResolveOrderOwnerNotifyResult> {
  try {
    const settings = (await req.payload.findGlobal({
      slug: 'payment-settings',
      depth: 0,
    })) as PaymentSetting
    const v = settings?.orderNotificationEmail
    if (typeof v === 'string' && v.trim() !== '') {
      return { to: v.trim(), usedPaymentSettingsOrderNotificationEmail: true }
    }
  } catch (err) {
    req.payload.logger.error(
      `[Orders] could not read payment-settings for order notification email: ${formatLogErr(err)}`,
    )
  }
  const env = process.env.ORDER_NOTIFY_EMAIL
  if (env && env.trim() !== '') {
    return { to: env.trim(), usedPaymentSettingsOrderNotificationEmail: false }
  }
  return { to: ORDER_NOTIFY_FALLBACK, usedPaymentSettingsOrderNotificationEmail: false }
}

function formatCurrency(amount: number, currency: string): string {
  const c = currency.trim() !== '' ? currency : 'THB'
  try {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: c }).format(amount)
  } catch {
    return `${amount} ${c}`
  }
}

function statusLabel(status: Order['status']): string {
  switch (status) {
    case 'awaiting_verification':
      return 'Awaiting verification'
    case 'confirmed':
      return 'Confirmed'
    case 'cancelled':
      return 'Cancelled'
    default:
      return '—'
  }
}

function paymentMethodLabel(method: Order['paymentMethod']): string {
  if (method === 'bank_transfer') return 'Bank transfer'
  return method ?? '—'
}

function slipInfo(slip: Order['slip']): { slipId: string | null; slipUrl: string | null } {
  if (slip == null) return { slipId: null, slipUrl: null }
  if (typeof slip === 'string') return { slipId: slip, slipUrl: null }
  if (typeof slip === 'object' && 'id' in slip) {
    const s = slip as PaymentSlip
    const url = typeof s.url === 'string' ? s.url : null
    return { slipId: s.id, slipUrl: url }
  }
  return { slipId: null, slipUrl: null }
}

/**
 * Owner email: load the payment slip document so `url` and `mimeType` match storage (S3, etc.).
 * Falls back to populated order.slip on failure; order flow is unchanged if this throws to caller
 * (we catch inside and log).
 */
async function resolveSlipForOwnerEmail(
  order: Order,
  req: { payload: Payload },
): Promise<{ slipId: string | null; slipUrl: string | null; slipMimeType: string | null }> {
  const fromOrder = slipInfo(order.slip)
  const slipId = fromOrder.slipId
  if (!slipId) {
    return { slipId: null, slipUrl: null, slipMimeType: null }
  }
  try {
    const doc = await req.payload.findByID({
      collection: 'payment-slips',
      id: slipId,
      depth: 0,
    })
    const s = doc as PaymentSlip
    const url = typeof s.url === 'string' && s.url.trim() !== '' ? s.url.trim() : null
    const mime =
      typeof s.mimeType === 'string' && s.mimeType.trim() !== '' ? s.mimeType.trim() : null
    return { slipId, slipUrl: absolutizeSlipUrlForEmail(url), slipMimeType: mime }
  } catch (err) {
    req.payload.logger.error(
      `[Orders] failed to load payment slip for owner email: ${formatLogErr(err)}`,
    )
    let fallbackMime: string | null = null
    if (typeof order.slip === 'object' && order.slip !== null) {
      const m = (order.slip as PaymentSlip).mimeType
      if (typeof m === 'string' && m.trim() !== '') fallbackMime = m.trim()
    }
    return {
      slipId,
      slipUrl: absolutizeSlipUrlForEmail(fromOrder.slipUrl),
      slipMimeType: fallbackMime,
    }
  }
}

function buildLineItemRows(order: Order, currency: string): LineItemRow[] {
  const c = currency || 'THB'
  const items = order.lineItems ?? []
  return items.map((row) => ({
    title: row.title,
    quantity: row.quantity,
    unitPriceLabel: formatCurrency(row.unitPrice, c),
    lineTotalLabel: formatCurrency(row.lineTotal, c),
  }))
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: { singular: 'Order', plural: 'Orders' },
  admin: {
    group: 'Checkout',
    useAsTitle: 'id',
    defaultColumns: ['customerName', 'email', 'subtotal', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== 'create') return

        req.payload.logger.info(
          `[Orders] [diag] afterChange create: hook started orderId=${String(doc.id)}`,
        )

        let order = doc as Order
        try {
          const full = await req.payload.findByID({
            collection: 'orders',
            id: doc.id,
            depth: 1,
          })
          if (full) order = full as Order
        } catch (err) {
          req.payload.logger.error(`[Orders] failed to load order for email: ${formatLogErr(err)}`)
        }

        const cur = order.currency ?? 'THB'
        const lineItems = buildLineItemRows(order, cur)
        const submittedAt = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })
        const { slipId, slipUrl, slipMimeType } = await resolveSlipForOwnerEmail(order, req)
        const { to: ownerNotifyTo, usedPaymentSettingsOrderNotificationEmail } =
          await resolveOrderOwnerNotifyTo(req)

        req.payload.logger.info(
          `[Orders] [diag] owner notify: resolved to=${ownerNotifyTo} paymentSettingsOrderNotificationEmailFound=${String(usedPaymentSettingsOrderNotificationEmail)}`,
        )

        try {
          req.payload.logger.info(
            `[Orders] [diag] owner notify: about to send email to=${ownerNotifyTo}`,
          )
          const html = await render(
            OrderNotificationEmail({
              orderId: order.id,
              customerName: order.customerName,
              email: order.email,
              phone: order.phone ?? '',
              address: order.address ?? '',
              customerNote: order.customerNote ?? '',
              subtotalLabel: formatCurrency(order.subtotal, cur),
              currency: cur,
              statusLabel: statusLabel(order.status),
              paymentMethodLabel: paymentMethodLabel(order.paymentMethod),
              lineItems,
              slipId,
              slipUrl,
              slipMimeType,
              submittedAt,
            }),
          )
          await req.payload.sendEmail({
            to: ownerNotifyTo,
            subject: `[SK-Sport] New order ${order.id} from ${order.customerName}`,
            html,
          })
          req.payload.logger.info(
            `[Orders] [diag] owner notification email: sent ok to=${ownerNotifyTo}`,
          )
        } catch (err) {
          req.payload.logger.error(`[Orders] owner notification email failed: ${formatLogErr(err)}`)
        }

        try {
          if (order.email) {
            const confirmHtml = await render(
              OrderConfirmationEmail({
                customerName: order.customerName,
                orderId: order.id,
                subtotalLabel: formatCurrency(order.subtotal, cur),
                currency: cur,
                statusLabel: statusLabel(order.status),
                paymentMethodLabel: paymentMethodLabel(order.paymentMethod),
                lineItems,
                submittedAt,
              }),
            )
            await req.payload.sendEmail({
              to: order.email,
              subject: 'We have received your order — SK Sport',
              html: confirmHtml,
            })
            req.payload.logger.info(
              `[Orders] [diag] customer confirmation email: sent ok to=${order.email}`,
            )
          }
        } catch (err) {
          req.payload.logger.error(
            `[Orders] customer confirmation email failed: ${formatLogErr(err)}`,
          )
        }
      },
    ],
  },
  timestamps: true,
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'awaiting_verification',
      options: [
        { label: 'Awaiting verification', value: 'awaiting_verification' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      defaultValue: 'bank_transfer',
      options: [{ label: 'Bank transfer', value: 'bank_transfer' }],
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'customerNote',
      type: 'textarea',
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'THB',
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
    },
    {
      name: 'lineItems',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'productId',
          type: 'text',
        },
        {
          name: 'slug',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
        {
          name: 'unitPrice',
          type: 'number',
          required: true,
        },
        {
          name: 'lineTotal',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'slip',
      type: 'relationship',
      relationTo: 'payment-slips',
      hasMany: false,
      label: 'Payment slip',
      admin: {
        description:
          'Linked upload from the Payment slips collection. A preview (image) or file link (PDF) appears in the field below when a slip is selected.',
      },
    },
    {
      name: 'slipPreview',
      type: 'ui',
      label:
        'Payment slip preview — image below when applicable; PDF/other files open in a new tab. Full file lives in Payment slips (not duplicated).',
      admin: {
        components: {
          Field: {
            path: '@/payload/components/OrderSlipPreviewField#default',
          },
        },
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
    },
  ],
}
