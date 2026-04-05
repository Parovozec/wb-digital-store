import { create } from 'zustand'
import type { Product, ProductCategory } from './types'

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Gold x1000 — Игровая валюта', description: 'Универсальная игровая валюта. Мгновенная доставка на почту.', price: 299, category: 'games', tags: ['gold', 'instant'], rating: 4.8, reviewCount: 1240, inStock: true, image: '🪙', badge: 'hot' },
  { id: '2', name: 'Premium Подписка 30 дней', description: 'Полный доступ ко всем функциям платформы без ограничений.', price: 599, originalPrice: 799, category: 'subscriptions', tags: ['premium', 'monthly'], rating: 4.9, reviewCount: 892, inStock: true, image: '⭐', badge: 'sale' },
  { id: '3', name: 'Steam Gift Card 500₽', description: 'Пополнение кошелька Steam. Код придёт в течение 5 минут.', price: 530, category: 'gift-cards', tags: ['steam', 'pc'], rating: 4.7, reviewCount: 3401, inStock: true, image: '🎮', badge: 'new' },
  { id: '4', name: 'Xbox Game Pass Ultimate 1 мес', description: 'Доступ к 100+ играм для Xbox и PC + Xbox Live Gold.', price: 499, originalPrice: 649, category: 'subscriptions', tags: ['xbox', 'gamepass'], rating: 4.9, reviewCount: 2109, inStock: true, image: '🎯', badge: 'sale' },
  { id: '5', name: 'Donator Pack Starter', description: 'Стартовый донат-пакет. Бонусы при регистрации x2.', price: 149, category: 'games', tags: ['starter', 'bonus'], rating: 4.6, reviewCount: 567, inStock: true, image: '🚀' },
  { id: '6', name: 'Adobe Creative Cloud 1 мес', description: 'Весь пакет Adobe: Photoshop, Illustrator, Premiere и др.', price: 2490, category: 'software', tags: ['adobe', 'design'], rating: 4.5, reviewCount: 344, inStock: true, image: '🎨' },
]

interface ProductStore {
  products: Product[]
  selectedCategory: ProductCategory | null
  searchQuery: string
  setCategory: (c: ProductCategory | null) => void
  setSearch: (q: string) => void
  filtered: () => Product[]
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: MOCK_PRODUCTS,
  selectedCategory: null,
  searchQuery: '',
  setCategory: (selectedCategory) => set({ selectedCategory }),
  setSearch: (searchQuery) => set({ searchQuery }),
  filtered: () => {
    const { products, selectedCategory, searchQuery } = get()
    return products.filter((p) => {
      const matchCat = !selectedCategory || p.category === selectedCategory
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  },
}))
