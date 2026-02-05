"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../features/auth/model/authStore";
import { useTranslations } from "../../shared/i18n";
import { Button } from "../../shared/ui/Button";

export const Navigation = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();
  const { t } = useTranslations();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <strong>{t("header.home")}</strong>
        <div className="nav-links">
          <Link className={isActive("/") ? "active" : ""} href="/">
            {t("header.products")}
          </Link>
          <Link className={isActive("/cart") ? "active" : ""} href="/cart">
            {t("header.cart")}
          </Link>
          <Link
            className={isActive("/profile") ? "active" : ""}
            href="/profile"
          >
            {t("header.profile")}
          </Link>
          <Link
            className={isActive("/messages") ? "active" : ""}
            href="/messages"
          >
            {t("header.support")}
          </Link>
        </div>
        <div className="inline">
          {!isAuthenticated ? (
            <>
              <Link
                className={isActive("/login") ? "active" : ""}
                href="/login"
              >
                {t("header.login")}
              </Link>
              <Link
                className={isActive("/register") ? "active" : ""}
                href="/register"
              >
                {t("header.register")}
              </Link>
            </>
          ) : (
            <Button onClick={() => void logout()}>{t("header.logout")}</Button>
          )}
        </div>
      </div>
    </nav>
  );
};
