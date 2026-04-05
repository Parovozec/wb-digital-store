import type { FC } from 'react'
import { useProductStore } from '@/entities/product/model/store'
import ProductCard from '@/entities/product/ui/ProductCard'
import type { ProductCategory } from '@/entities/product/model/types'

const CATEGORIES: { label: string; value: ProductCategory | null }[] = [
  { label: 'Все', value: null },
  { label: 'Игры', value: 'games' },
  { label: 'Подписки', value: 'subscriptions' },
  { label: 'Gift Cards', value: 'gift-cards' },
  { label: 'Софт', value: 'software' },
]

const Catalog: FC = () => {
  const { selectedCategory, searchQuery, setCategory, setSearch, filtered } = useProductStore()
  const products = filtered()

  return (
    <div className="catalog">
      <div className="catalog__toolbar">
        <input
          className="search-input"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="category-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              className={`cat-btn${selectedCategory === c.value ? ' cat-btn--active' : ''}`}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">Ничего не найдено</div>
      ) : (
        <div className="products-grid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

export default Catalog
