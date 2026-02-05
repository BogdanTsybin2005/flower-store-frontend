"use client";

import { useEffect } from "react";
import Link from "next/link";
import { api } from "@/shared/api";
import { useAsync } from "@/shared/hooks/useAsync";
import { useAuthStore } from "@/features/auth/model/authStore";
import { useTranslations } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";
import { Alert } from "@/shared/ui/Alert";
import { Loader } from "@/shared/ui/Loader";
import { formatCurrency } from "@/shared/lib/format";

export default function OrdersPage() {
  const { token, isAuthenticated } = useAuthStore();
  const { t } = useTranslations();
  const {
    data: orders,
    error,
    isLoading,
    execute,
  } = useAsync(() => (token ? api.orders.list(token) : Promise.resolve([])));

  useEffect(() => {
    if (isAuthenticated && token) {
      void execute();
    }
  }, [isAuthenticated, token, execute]);

  if (!isAuthenticated) {
    return (
      <Container>
        <Card className="stack">
          <h1>{t("orders.title")}</h1>
          <p>
            Please <Link href="/login">{t("auth.login")}</Link> to view your
            orders.
          </p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="stack">
      <h1>{t("orders.title")}</h1>
      {isLoading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {!isLoading && !error && (!orders || orders.length === 0) && (
        <Card className="stack">
          <p>{t("orders.noOrders")}</p>
          <Link href="/">{t("cart.browseProducts")}</Link>
        </Card>
      )}
      {!isLoading && !error && orders && orders.length > 0 && (
        <div className="stack">
          {orders.map((order) => (
            <Card key={order.id} className="stack" style={{ padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Order #{order.order_number ?? order.id}</strong>
                  <p className="muted">
                    {t("orders.status")}: {order.status}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong>{formatCurrency(order.total_cents)}</strong>
                </div>
              </div>
              <Link href={`/orders/${order.id}`}>{t("orders.details")}</Link>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
