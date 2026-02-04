'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../features/auth/model/authStore';
import { Button } from '../../shared/ui/Button';

export const Navigation = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <strong>Flower Store</strong>
        <div className="nav-links">
          <Link className={isActive('/') ? 'active' : ''} href="/">
            Products
          </Link>
          <Link className={isActive('/cart') ? 'active' : ''} href="/cart">
            Cart
          </Link>
          <Link className={isActive('/profile') ? 'active' : ''} href="/profile">
            Profile
          </Link>
          <Link className={isActive('/messages') ? 'active' : ''} href="/messages">
            Support
          </Link>
        </div>
        <div className="inline">
          {!isAuthenticated ? (
            <>
              <Link className={isActive('/login') ? 'active' : ''} href="/login">
                Login
              </Link>
              <Link className={isActive('/register') ? 'active' : ''} href="/register">
                Register
              </Link>
            </>
          ) : (
            <Button onClick={() => void logout()}>Logout</Button>
          )}
        </div>
      </div>
    </nav>
  );
};
