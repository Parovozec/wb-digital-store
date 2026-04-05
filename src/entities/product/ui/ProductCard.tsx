import type { FC } from 'react'
import clsx from 'clsx'
import type { Product } from '../model/types'
import { useCartStore } from '@/entities/cart/model/store'

interface Props { product: Product }

const BADGE_LABEL = { new: 'Новинка', sale: 'Скидка', hot: 'Хит' }
const BADGE_CLASS = { new: 'badge--new', sale: 'badge--sale', hot: 'badge--hot' }

const ProductCard: FC<Props> = ({ product }) => {
  const add = useCartStore((s) => s.add)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="product-card">
      {product.badge && (
        <span className={clsx('badge', BADGE_CLASS[product.badge])}>
          {BADGE_LABEL[product.badge]}
        </span>
      )}
      <div className="product-card__image">{product.image}</div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__rating">
          {'⭐'.repeat(Math.round(product.rating))}
          <span className="product-card__reviews">({product.reviewCount})</span>
        </div>
        <div className="product-card__footer">
          <div className="product-card__price-block">
            <span className="product-card__price">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.originalPrice && (
              <>
                <span className="product-card__original">{product.originalPrice.toLocaleString('ru-RU')} ₽</span>
                <span className="product-card__discount">−{discount}%</span>
              </>
            )}
          </div>
          <button className="btn-add" onClick={() => add(product)}>В корзину</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
