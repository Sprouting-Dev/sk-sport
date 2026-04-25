'use client'

import { useState } from 'react'
import { MinusIcon, PlusIcon, ShoppingCartSimpleIcon, CheckIcon } from '@phosphor-icons/react'
import { useCart } from '@/context/cartContext'

interface AddToCartButtonProps {
  /** Only `buy` products may use the cart; quote products must not render this or it returns null. */
  mode: 'quote' | 'buy'
  /** THB unit price; required for buy (parent only renders when purchasable). */
  unitPrice: number
  currency: 'THB'
  id: string
  slug: string
  title: string
  subtitle?: string | null
  category?: string | null
  image?: string
}

export default function AddToCartButton({
  mode,
  unitPrice,
  currency,
  id,
  slug,
  title,
  subtitle,
  category,
  image,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const canUseCart =
    mode === 'buy' && typeof unitPrice === 'number' && Number.isFinite(unitPrice) && unitPrice > 0

  if (!canUseCart) {
    return null
  }

  const handleAdd = () => {
    if (typeof unitPrice !== 'number' || !Number.isFinite(unitPrice) || unitPrice <= 0) {
      return
    }
    addItem({
      mode: 'buy',
      unitPrice,
      currency,
      id,
      slug,
      title,
      subtitle: subtitle ?? undefined,
      category: category ?? undefined,
      image,
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="inline-flex w-fit items-center gap-1 rounded-box border border-base-300 bg-base-100 px-1 py-0.5">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-box text-base-content transition-colors hover:bg-base-200 hover:text-primary"
          aria-label="Decrease quantity"
        >
          <MinusIcon size={18} weight="bold" />
        </button>
        <span className="min-w-9 text-center body-sm font-semibold tabular-nums text-base-content">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-box text-base-content transition-colors hover:bg-base-200 hover:text-primary"
          aria-label="Increase quantity"
        >
          <PlusIcon size={18} weight="bold" />
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="btn btn-gradient-solid-border btn-lg btn-lg-typo flex items-center gap-2 px-6 transition-all duration-200"
      >
        {added ? (
          <CheckIcon size={18} className="text-primary" />
        ) : (
          <ShoppingCartSimpleIcon size={18} className="text-primary" />
        )}
        <span className="text-primary">{added ? 'Added to Cart!' : 'Add to Cart'}</span>
      </button>
    </div>
  )
}
