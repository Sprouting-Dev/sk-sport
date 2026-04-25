'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useCart, isCartLinePriced, type CartItem } from '@/context/cartContext'
import type { CheckoutPaymentSettings } from '@/data/paymentSettings'

const thb = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })

type Props = { payment: CheckoutPaymentSettings }

type CheckoutItemPayload = { id: string; slug: string; quantity: number }

function buildPricedItemsForApi(items: CartItem[]): CheckoutItemPayload[] {
  return items.filter(isCartLinePriced).map((i) => ({
    id: i.id,
    slug: i.slug,
    quantity: i.quantity,
  }))
}

export function CheckoutClient({ payment }: Props) {
  const { items, clearCart } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [customerNote, setCustomerNote] = useState('')
  const [slipFile, setSlipFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null)

  const { hasUnpricedLines, lineRows, subtotal } = useMemo(() => {
    let unpriced = false
    const rows: { item: CartItem; line: number }[] = []
    let total = 0
    for (const item of items) {
      if (isCartLinePriced(item)) {
        const line = item.unitPrice * item.quantity
        total += line
        rows.push({ item, line })
      } else {
        unpriced = true
      }
    }
    return {
      hasUnpricedLines: unpriced,
      lineRows: rows,
      subtotal: total,
    }
  }, [items])

  const canCheckout = items.length > 0 && !hasUnpricedLines

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!canCheckout) {
      setError('Your cart is not ready for checkout. Remove unpriced items or return to the cart.')
      return
    }
    if (!customerName.trim() || !email.trim()) {
      setError('Name and email are required.')
      return
    }
    if (!slipFile || slipFile.size < 1) {
      setError('Please upload a payment slip (image or PDF).')
      return
    }

    const payload = buildPricedItemsForApi(items)
    if (payload.length === 0) {
      setError('No purchasable items in your cart.')
      return
    }

    const form = new FormData()
    form.set('customerName', customerName.trim())
    form.set('email', email.trim())
    form.set('phone', phone.trim())
    form.set('address', address.trim())
    form.set('customerNote', customerNote.trim())
    form.set('items', JSON.stringify(payload))
    form.set('slip', slipFile, slipFile.name)

    setSubmitting(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: form,
      })
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean
        orderId?: string
        error?: string
      }
      if (!res.ok || !data.success || !data.orderId) {
        setError(
          typeof data.error === 'string' && data.error.trim() !== ''
            ? data.error
            : 'Checkout could not be completed. Please try again.',
        )
        return
      }
      clearCart()
      setSuccessOrderId(data.orderId)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (successOrderId) {
    return (
      <div className="flex w-full flex-col items-center">
        <section className="section-bg-to-right w-full py-16 md:py-24">
          <div className="relative z-10 container mx-auto flex max-w-2xl flex-col gap-3 px-6 text-center">
            <h1 className="text-primary-content">Order received</h1>
            <p className="body-sm text-primary-content/90">
              Thank you. Your order <span className="font-mono text-sm">{successOrderId}</span> was
              submitted. We will verify your payment and contact you if needed.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/product"
                className="btn btn-gradient-solid-border btn-lg btn-lg-typo px-8"
              >
                <span className="text-primary">Continue shopping</span>
              </Link>
              <Link
                href="/"
                className="body-sm text-primary-content/90 underline-offset-2 hover:underline"
              >
                Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col items-center">
        <section className="section-bg-to-right w-full py-16 md:py-24">
          <div className="relative z-10 container mx-auto max-w-2xl px-6 text-center">
            <h1 className="text-primary-content">Your cart is empty</h1>
            <p className="body-sm mt-2 text-primary-content/80">
              Add products from the shop before checking out.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <Link
                href="/product"
                className="btn btn-gradient-solid-border btn-lg btn-lg-typo px-8"
              >
                <span className="text-primary">Browse products</span>
              </Link>
              <Link
                href="/cart"
                className="body-sm text-primary-content/80 underline-offset-2 hover:underline"
              >
                View cart
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (hasUnpricedLines) {
    return (
      <div className="flex w-full flex-col items-center">
        <section className="section-bg-to-right w-full py-16 md:py-24">
          <div className="relative z-10 container mx-auto max-w-2xl px-6 text-center">
            <h1 className="text-primary-content">Cart needs attention</h1>
            <p className="body-sm mt-2 text-primary-content/80">
              One or more items are missing a price. Remove them or re-add from the product listing,
              then return to checkout.
            </p>
            <div className="mt-6">
              <Link href="/cart" className="btn btn-gradient-solid-border btn-lg btn-lg-typo px-8">
                <span className="text-primary">Back to cart</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-12 md:py-16">
        <div className="relative z-10 container mx-auto max-w-4xl px-6">
          <h1 className="text-primary-content">Checkout</h1>
          <p className="body-sm mt-1 text-primary-content/80">
            Bank transfer — review and submit your order
          </p>
        </div>
      </section>

      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="container mx-auto w-full max-w-4xl px-6 py-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="rounded-box border border-base-300 bg-primary-content p-5 shadow-sm">
                <h2 className="text-primary">Order summary</h2>
                <div className="mt-2 h-0.5 w-12 bg-gradient" />
                <ul className="mt-4 flex flex-col gap-3">
                  {lineRows.map(({ item, line }) => (
                    <li
                      key={item.id}
                      className="body-sm flex flex-col gap-0.5 border-b border-base-200 pb-3 last:border-0"
                    >
                      <span className="font-medium text-base-content leading-snug">
                        {item.title}
                      </span>
                      <span className="text-subtle">
                        Qty {item.quantity} · Line {thb.format(line)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between border-t border-base-300 pt-3">
                  <span className="body-sm font-medium text-base-content">Subtotal (THB)</span>
                  <span className="body-sm font-semibold text-base-content">
                    {thb.format(subtotal)}
                  </span>
                </div>
                <p className="body-sm mt-2 text-subtle">
                  Amounts are confirmed on the server; displayed totals are for your reference.
                </p>
              </div>

              <div className="rounded-box border border-base-300 bg-primary-content p-5 shadow-sm">
                <h2 className="text-primary">Bank transfer</h2>
                <div className="mt-2 h-0.5 w-12 bg-gradient" />
                {payment.isEnabled ? (
                  <div className="mt-4 flex flex-col gap-3 body-sm text-base-content">
                    {payment.bankName ? (
                      <p>
                        <span className="text-subtle">Bank: </span>
                        {payment.bankName}
                      </p>
                    ) : null}
                    {payment.accountName ? (
                      <p>
                        <span className="text-subtle">Account name: </span>
                        {payment.accountName}
                      </p>
                    ) : null}
                    {payment.accountNumber ? (
                      <p>
                        <span className="text-subtle">Account number: </span>
                        {payment.accountNumber}
                      </p>
                    ) : null}
                    {payment.branch ? (
                      <p>
                        <span className="text-subtle">Branch: </span>
                        {payment.branch}
                      </p>
                    ) : null}
                    {payment.paymentInstructions ? (
                      <p className="whitespace-pre-wrap text-base-content/90">
                        {payment.paymentInstructions}
                      </p>
                    ) : null}
                    {payment.qrCodeUrl ? (
                      <div className="pt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={payment.qrCodeUrl}
                          alt="Payment QR"
                          className="max-w-48 rounded-box border border-base-300"
                        />
                      </div>
                    ) : null}
                    {!payment.bankName &&
                      !payment.accountNumber &&
                      !payment.paymentInstructions && (
                        <p className="text-subtle">Store owner can add details in the CMS.</p>
                      )}
                  </div>
                ) : (
                  <p className="body-sm mt-4 text-subtle">
                    Bank details are not shown here. You will receive confirmation by email with
                    next steps.
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-box border border-base-300 bg-primary-content p-5 shadow-sm md:p-6"
              >
                <h2 className="text-primary">Your details</h2>
                {error ? (
                  <p className="body-sm text-error" role="alert">
                    {error}
                  </p>
                ) : null}

                <label className="flex flex-col gap-1 body-sm text-base-content">
                  <span>Full name *</span>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="rounded-box border border-base-300 bg-base-100 px-3 py-2 outline-none focus:border-primary/50"
                    autoComplete="name"
                    disabled={submitting}
                  />
                </label>
                <label className="flex flex-col gap-1 body-sm text-base-content">
                  <span>Email *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-box border border-base-300 bg-base-100 px-3 py-2 outline-none focus:border-primary/50"
                    autoComplete="email"
                    disabled={submitting}
                  />
                </label>
                <label className="flex flex-col gap-1 body-sm text-base-content">
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-box border border-base-300 bg-base-100 px-3 py-2 outline-none focus:border-primary/50"
                    autoComplete="tel"
                    disabled={submitting}
                  />
                </label>
                <label className="flex flex-col gap-1 body-sm text-base-content">
                  <span>Address</span>
                  <textarea
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="rounded-box border border-base-300 bg-base-100 px-3 py-2 outline-none focus:border-primary/50"
                    disabled={submitting}
                  />
                </label>
                <label className="flex flex-col gap-1 body-sm text-base-content">
                  <span>Note to seller</span>
                  <textarea
                    name="customerNote"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    rows={2}
                    className="rounded-box border border-base-300 bg-base-100 px-3 py-2 outline-none focus:border-primary/50"
                    disabled={submitting}
                  />
                </label>
                <label className="flex flex-col gap-1 body-sm text-base-content">
                  <span>Payment slip (image or PDF) *</span>
                  <input
                    type="file"
                    name="slip"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    required
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      setSlipFile(f && f.size > 0 ? f : null)
                    }}
                    className="body-sm file:mr-3 file:rounded file:border-0 file:bg-base-200 file:px-3 file:py-1"
                    disabled={submitting}
                  />
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="btn btn-gradient-solid-border btn-lg btn-lg-typo flex-1 text-center"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="text-primary">Submitting…</span>
                    ) : (
                      <span className="text-primary">Place order</span>
                    )}
                  </button>
                  <Link
                    href="/cart"
                    className="body-sm text-center text-subtle underline-offset-2 hover:underline"
                  >
                    Back to cart
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
