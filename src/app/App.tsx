import { useState, type FC } from 'react'
import Catalog from '@/widgets/catalog/ui/Catalog'
import CartDrawer from '@/widgets/cart/ui/CartDrawer'
import { useCartStore } from '@/entities/cart/model/store'
import '../styles/global.css'

const App: FC = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const count = useCartStore((s) => s.count())

  return (
    <div className="app">
      <header className="header">
        <div className="header__brand">
          <span className="header__logo">WB</span>
          <span className="header__title">Digital Store</span>
        </div>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          🛒 Корзина {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </header>

      <main className="main">
        <div className="hero">
          <h1>Цифровые товары</h1>
          <p>Игровая валюта, подписки, gift cards — мгновенная доставка</p>
        </div>
        <Catalog />
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default App
