"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navigation } from "../widgets/layout/Navigation";
import { useAuthStore } from "../features/auth/model/authStore";
import { useCartStore } from "../features/cart/model/cartStore";

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
      <footer
        className="footer"
        style={{
          borderTop: "1px solid #eee",
          padding: "2rem 1rem",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <h4>Company</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/messages">Chat with Support</Link>
              </li>
              <li>
                <a href="mailto:support@flowerstore.com">Email Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            paddingTop: "1rem",
            borderTop: "1px solid #eee",
            color: "#999",
            fontSize: "0.9rem",
          }}
        >
          Fresh flowers delivered with care. © 2026 Flower Store.
        </div>
      </footer>
    </div>
  );
};
