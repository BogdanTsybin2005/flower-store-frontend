'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navigation } from '../widgets/layout/Navigation';
import { useAuthStore } from '../features/auth/model/authStore';
import { useCartStore } from '../features/cart/model/cartStore';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const hydrateAuth = useAuthStore((state) => state.hydrate);
  const hydrateCart = useCartStore((state) => state.hydrate);

  useEffect(() => {
    hydrateAuth();
    hydrateCart();
  }, [hydrateAuth, hydrateCart]);

  return (
    <div className="app-shell">
      <Navigation />
      <main className="main">{children}</main>
      <footer className="footer">Fresh flowers delivered with care.</footer>
    </div>
  );
};
