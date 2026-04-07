'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'sksport-cart'

export interface CartItem {
  id: string
  slug: string
  title: string
  subtitle?: string
  category?: string
  image?: string
  quantity: number
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
            i.id === itemData.id ? { ...i, quantity: i.quantity + quantity } : i,
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

function loadFromStorage(): CartState {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw) as CartState
    if (!Array.isArray(parsed?.items)) return { items: [] }
    return parsed
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
