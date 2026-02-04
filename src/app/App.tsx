import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from '../widgets/layout/Navigation';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProfilePage } from '../pages/ProfilePage';
import { MessagesPage } from '../pages/MessagesPage';
import { useAuthStore } from '../features/auth/model/authStore';
import { useCartStore } from '../features/cart/model/cartStore';
import './styles.css';

export const App = () => {
  const hydrateAuth = useAuthStore((state) => state.hydrate);
  const hydrateCart = useCartStore((state) => state.hydrate);

  useEffect(() => {
    hydrateAuth();
    hydrateCart();
  }, [hydrateAuth, hydrateCart]);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Routes>
        </main>
        <footer className="footer">Fresh flowers delivered with care.</footer>
      </div>
    </BrowserRouter>
  );
};
