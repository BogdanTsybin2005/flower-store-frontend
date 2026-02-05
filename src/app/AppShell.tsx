"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navigation } from "../widgets/layout/Navigation";
import { useAuthStore } from "../features/auth/model/authStore";
import { useCartStore } from "../features/cart/model/cartStore";
import { useLanguageStore, useTranslations } from "../shared/i18n";
import { LanguageSwitcher } from "../shared/ui/LanguageSwitcher";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const { t } = useTranslations();
  useEffect(() => {
    // Hydrate all stores on client-side mount
    useAuthStore.getState().hydrate();
    useCartStore.getState().hydrate();
    useLanguageStore.getState().hydrate();
  }, []);

  return (
    <div className="app-shell">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
          borderBottom: "1px solid #eee",
        }}
      >
        <Navigation />
        <LanguageSwitcher />
      </div>
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
            <h4>{t("footer.company")}</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/about">{t("footer.about")}</Link>
              </li>
              <li>
                <Link href="/faq">{t("footer.faq")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("footer.contact")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("footer.legal")}</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/terms">{t("footer.terms")}</Link>
              </li>
              <li>
                <Link href="/privacy">{t("footer.privacy")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("footer.support")}</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/messages">{t("footer.chatSupport")}</Link>
              </li>
              <li>
                <a href="mailto:support@flowerstore.com">
                  {t("footer.emailUs")}
                </a>
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
          {t("footer.copyright")}
        </div>
      </footer>
    </div>
  );
};
