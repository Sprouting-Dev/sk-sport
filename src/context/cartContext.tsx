'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'sksport-cart'

/** `mode` / `unitPrice` / `currency` are set for buy lines from Phase 2; earlier carts may omit them. */
export interface CartItem {
  id: string
  slug: string
  title: string
  subtitle?: string
  category?: string
  image?: string
  quantity: number
  mode?: 'buy'
  unitPrice?: number
  currency?: 'THB'
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { quantity = 1, ...itemData } = action.payload
      const existing = state.items.find((i) => i.id === itemData.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === itemData.id
              ? {
                  ...i,
                  ...itemData,
                  quantity: i.quantity + quantity,
                  mode: itemData.mode ?? i.mode,
                  unitPrice: itemData.unitPrice ?? i.unitPrice,
                  currency: itemData.currency ?? i.currency,
                }
              : i,
          ),
        }
      }
      return { items: [...state.items, { ...itemData, quantity }] }
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload.id) }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== id) }
      }
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      }
    }

    case 'CLEAR_CART':
      return { items: [] }

    default:
      return state
  }
}

export function isCartLinePriced(
  item: CartItem,
): item is CartItem & { mode: 'buy'; unitPrice: number; currency: 'THB' } {
  return (
    item.mode === 'buy' &&
    item.currency === 'THB' &&
    typeof item.unitPrice === 'number' &&
    Number.isFinite(item.unitPrice) &&
    item.unitPrice > 0
  )
}

function normalizeCartItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.id !== 'string' || typeof o.slug !== 'string' || typeof o.title !== 'string') {
    return null
  }
  const quantity = Number(o.quantity)
  if (!Number.isFinite(quantity) || quantity < 1) return null
  const item: CartItem = {
    id: o.id,
    slug: o.slug,
    title: o.title,
    quantity,
  }
  if (typeof o.subtitle === 'string') item.subtitle = o.subtitle
  if (typeof o.category === 'string') item.category = o.category
  if (typeof o.image === 'string') item.image = o.image
  if (o.mode === 'buy') item.mode = 'buy'
  if (o.currency === 'THB') item.currency = 'THB'
  if (typeof o.unitPrice === 'number' && Number.isFinite(o.unitPrice) && o.unitPrice > 0) {
    item.unitPrice = o.unitPrice
  }
  return item
}

function loadFromStorage(): CartState {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw) as { items?: unknown }
    if (!Array.isArray(parsed?.items)) return { items: [] }
    const items = parsed.items
      .map((row) => normalizeCartItem(row))
      .filter((i): i is CartItem => i !== null)
    return { items }
  } catch {
    return { items: [] }
  }
}

function saveToStorage(state: CartState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage quota or private mode — fail silently
  }
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, loadFromStorage)

  useEffect(() => {
    saveToStorage(state)
  }, [state])

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) =>
    dispatch({ type: 'ADD_ITEM', payload: item })

  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } })

  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return ctx
}
