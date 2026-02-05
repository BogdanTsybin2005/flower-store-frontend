"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/shared/api";
import { useAuthStore } from "@/features/auth/model/authStore";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";
import { Alert } from "@/shared/ui/Alert";
import { Loader } from "@/shared/ui/Loader";
import { formatCurrency } from "@/shared/lib/format";
import type { OrderOut } from "@/shared/api/types";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { token, isAuthenticated } = useAuthStore();
  const [order, setOrder] = useState<OrderOut | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const orders = await api.orders.list(token);
        const found = orders.find((o) => o.id === orderId);
        if (found) {
          setOrder(found);
        } else {
          setError("Order not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load order.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchOrder();
  }, [isAuthenticated, token, orderId]);

  if (!isAuthenticated) {
    return (
      <Container>
        <Card className="stack">
          <h1>Order Details</h1>
          <p>
            Please <Link href="/login">login</Link> to view order details.
          </p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="stack">
      <Link href="/orders">&larr; Back to Orders</Link>
      <h1>Order Details</h1>
      {isLoading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {!isLoading && !error && order && (
        <div className="stack">
          <Card className="stack">
            <h2>Order #{order.order_number ?? order.id}</h2>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> {formatCurrency(order.total_cents)}
            </p>
          </Card>
          <Card className="stack">
            <h3>Items</h3>
            <p className="muted">Order items information not available.</p>
          </Card>
        </div>
      )}
    </Container>
  );
}
