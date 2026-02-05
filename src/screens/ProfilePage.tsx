"use client";

import { useEffect } from "react";
import { api } from "../shared/api";
import { useAsync } from "../shared/hooks/useAsync";
import { useAuthStore } from "../features/auth/model/authStore";
import { useTranslations } from "../shared/i18n";
import { Container } from "../shared/ui/Container";
import { Card } from "../shared/ui/Card";
import { Alert } from "../shared/ui/Alert";
import { Loader } from "../shared/ui/Loader";
import { formatCurrency } from "../shared/lib/format";

export const ProfilePage = () => {
  const { token, userId, isAuthenticated } = useAuthStore();
  const { t } = useTranslations();
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    execute: loadUsers,
  } = useAsync(api.users.list);
  const {
    data: orders,
    error: ordersError,
    isLoading: ordersLoading,
    execute: loadOrders,
  } = useAsync(api.orders.list);

  useEffect(() => {
    if (isAuthenticated && token) {
      void loadUsers(token);
      void loadOrders(token);
    }
  }, [isAuthenticated, token, loadUsers, loadOrders]);

  if (!isAuthenticated) {
    return (
      <Container>
        <Card className="stack">
          <h1>{t("profile.title")}</h1>
          <p>{t("profile.pleaseLogin")}</p>
        </Card>
      </Container>
    );
  }

  const user = users?.find((item) => item.id === userId);

  return (
    <Container className="stack">
      <h1>{t("profile.yourData")}</h1>
      {(usersLoading || ordersLoading) && <Loader />}
      {(usersError || ordersError) && (
        <Alert>{usersError ?? ordersError}</Alert>
      )}
      {user && (
        <Card className="stack">
          <strong>{user.full_name ?? "Customer"}</strong>
          <p className="muted">Role: {user.role}</p>
          <p>Status: {user.is_active ? "Active" : "Inactive"}</p>
        </Card>
      )}
      <Card className="stack">
        <h2>{t("orders.title")}</h2>
        {orders?.length === 0 && <p>{t("orders.noOrders")}</p>}
        {orders?.map((order) => (
          <div
            key={order.id}
            className="inline"
            style={{ justifyContent: "space-between" }}
          >
            <span>
              Order #{order.order_number ?? "—"} ({order.status})
            </span>
            <strong>{formatCurrency(order.total_cents, order.currency)}</strong>
          </div>
        ))}
      </Card>
    </Container>
  );
};
