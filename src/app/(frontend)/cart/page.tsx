'use client'

import Link from 'next/link'
import { MinusIcon, PlusIcon, TrashIcon, ShoppingCartSimpleIcon } from '@phosphor-icons/react'
import { useCart } from '@/context/cartContext'

export default function CartPage() {
  const { items, totalItems, updateQuantity, removeItem, clearCart } = useCart()

  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6 flex flex-col gap-3">
          <h1 className="text-primary-content">Your Cart</h1>
          {totalItems > 0 && (
            <p className="body-sm text-primary-content/80">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
            </p>
          )}
        </div>
      </section>

      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="container mx-auto px-6 py-10 md:py-16">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-16 text-center">
              <ShoppingCartSimpleIcon size={56} className="text-subtle" />
              <p className="body-sm text-subtle">Your cart is empty.</p>
              <Link
                href="/product"
                className="btn btn-gradient-solid-border btn-lg btn-lg-typo px-8"
              >
                <span className="text-primary">Browse Products</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              {/* Item list */}
              <div className="flex flex-1 flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 rounded-box border border-base-300 bg-primary-content px-5 py-4 shadow-sm"
                  >
                    {/* Image */}
                    <div className="shrink-0 h-20 w-20 overflow-hidden rounded-box border border-base-300 bg-base-200">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingCartSimpleIcon size={20} className="text-subtle" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      {item.category && (
                        <span className="body-sm text-primary font-semibold uppercase tracking-widest">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-base-content leading-snug truncate">{item.title}</h3>
                      {item.subtitle && <p className="body-sm text-subtle">{item.subtitle}</p>}
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex shrink-0 flex-col items-end gap-3">
                      <div className="flex items-center gap-2 rounded-box border border-base-300 bg-base-100 px-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-base-content transition-colors hover:text-primary"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span className="body-sm w-6 text-center font-medium text-base-content">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-base-content transition-colors hover:text-primary"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 body-sm text-subtle transition-colors hover:text-error"
                        aria-label="Remove item"
                      >
                        <TrashIcon size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="body-sm text-subtle underline-offset-2 hover:underline transition-colors hover:text-error"
                  >
                    Clear all items
                  </button>
                </div>
              </div>

              {/* Summary sidebar */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="flex flex-col gap-5 rounded-box border border-base-300 bg-primary-content px-6 py-6 shadow-sm">
                  <h2 className="text-primary">Order Summary</h2>
                  <div className="h-0.5 w-12 bg-gradient" />

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="body-sm text-subtle">Total items</span>
                      <span className="body-sm font-medium text-base-content">{totalItems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="body-sm text-subtle">Unique products</span>
                      <span className="body-sm font-medium text-base-content">{items.length}</span>
                    </div>
                  </div>

                  <p className="body-sm text-subtle leading-relaxed">
                    Pricing is provided upon request. Contact us and our team will prepare a custom
                    quote for your selection.
                  </p>

                  <Link
                    href="/contact"
                    className="btn btn-gradient-solid-border btn-lg btn-lg-typo w-full text-center"
                  >
                    <span className="text-primary">Request a Quote</span>
                  </Link>

                  <Link
                    href="/product"
                    className="body-sm text-center text-subtle underline-offset-2 hover:underline"
                  >
                    Continue browsing
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
