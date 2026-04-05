import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/entities/product/model/types'

interface CartStore {
  items: CartItem[]
  add: (product: Product) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        const items = get().items
        const existing = items.find((i) => i.product.id === product.id)
        if (existing) {
          set({ items: items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.product.id !== id) }),
      updateQty: (id, qty) => {
        if (qty < 1) { get().remove(id); return }
        set({ items: get().items.map((i) => i.product.id === id ? { ...i, quantity: qty } : i) })
      },
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'cart' }
  )
)
