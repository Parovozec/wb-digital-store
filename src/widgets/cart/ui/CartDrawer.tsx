import type { FC } from 'react'
import { useCartStore } from '@/entities/cart/model/store'

interface Props { open: boolean; onClose: () => void }

const CartDrawer: FC<Props> = ({ open, onClose }) => {
  const { items, remove, updateQty, total, clear } = useCartStore()

  if (!open) return null

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer__header">
          <h2>Корзина</h2>
          <button className="drawer__close" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="drawer__empty">Корзина пуста</div>
        ) : (
          <>
            <div className="drawer__items">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <span className="cart-item__image">{product.image}</span>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{product.name}</p>
                    <p className="cart-item__price">{(product.price * quantity).toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(product.id, quantity - 1)}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => updateQty(product.id, quantity + 1)}>+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => remove(product.id)}>🗑</button>
                </div>
              ))}
            </div>
            <div className="drawer__footer">
              <div className="drawer__total">Итого: <strong>{total().toLocaleString('ru-RU')} ₽</strong></div>
              <button className="checkout-btn">Оформить заказ</button>
              <button className="clear-btn" onClick={clear}>Очистить</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartDrawer
