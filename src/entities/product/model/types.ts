export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: ProductCategory
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  image: string
  badge?: 'new' | 'sale' | 'hot'
}

export type ProductCategory = 'games' | 'subscriptions' | 'gift-cards' | 'software'

export interface CartItem {
  product: Product
  quantity: number
}
