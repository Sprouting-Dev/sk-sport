'use client'

import { useState } from 'react'
import { ShoppingCartSimpleIcon, CheckIcon } from '@phosphor-icons/react'
import { useCart } from '@/context/cartContext'

interface AddToCartButtonProps {
  id: string
  slug: string
  title: string
  subtitle?: string | null
  category?: string | null
  image?: string
}

export default function AddToCartButton({
  id,
  slug,
  title,
  subtitle,
  category,
  image,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id,
      slug,
      title,
      subtitle: subtitle ?? undefined,
      category: category ?? undefined,
      image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
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
  )
}
