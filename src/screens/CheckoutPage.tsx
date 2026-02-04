'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '../shared/api';
import type { PaymentProvider, PaymentStatusOut } from '../shared/api/types';
import { useAuthStore } from '../features/auth/model/authStore';
import { useCartStore } from '../features/cart/model/cartStore';
import { Container } from '../shared/ui/Container';
import { Card } from '../shared/ui/Card';
import { Input } from '../shared/ui/Input';
import { Select } from '../shared/ui/Select';
import { Button } from '../shared/ui/Button';
import { Alert } from '../shared/ui/Alert';
import { formatCurrency } from '../shared/lib/format';
import { calculateSubtotal } from '../shared/lib/cart';

const PROVIDERS: PaymentProvider[] = ['manual', 'bank_transfer', 'card', 'crypto'];

export const CheckoutPage = () => {
  const { token, userId, isAuthenticated } = useAuthStore();
  const { items, clear } = useCartStore();
  const [notes, setNotes] = useState('');
  const [provider, setProvider] = useState<PaymentProvider>('manual');
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusOut | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = useMemo(() => calculateSubtotal(items), [items]);
  const total = subtotal;

  useEffect(() => {
    if (!paymentId || !token) return;
    const interval = window.setInterval(async () => {
      try {
        const status = await api.payments.status(paymentId, token);
        setPaymentStatus(status);
        if (['paid', 'failed', 'cancelled', 'refunded'].includes(status.status)) {
          window.clearInterval(interval);
        }
        if (status.status === 'paid') {
          clear();
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to refresh payment.';
        setError(message);
      }
    }, 3000);

    return () => window.clearInterval(interval);
  }, [paymentId, token, clear]);

  const handleCheckout = async () => {
    setError(null);
    if (!isAuthenticated || !token || !userId) {
      setError('Please log in to place your order.');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    try {
      setIsLoading(true);
      const order = await api.orders.create(
        {
          client_id: userId,
          subtotal_cents: subtotal,
          total_cents: total,
          notes: notes || null,
        },
        token
      );
      setOrderId(order.id);
      const payment = await api.payments.create(
        {
          order_id: order.id,
          amount_cents: total,
          provider,
        },
        token
      );
      setPaymentId(payment.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Checkout failed.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="stack">
      <h1>Checkout</h1>
      {error && <Alert>{error}</Alert>}
      <div className="split">
        <Card className="stack">
          <h2>Order summary</h2>
          {items.map((item) => (
            <div key={item.product.id} className="inline" style={{ justifyContent: 'space-between' }}>
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.product.price_cents * item.quantity)}</span>
            </div>
          ))}
          <strong>Total: {formatCurrency(total)}</strong>
        </Card>
        <Card className="stack">
          <h2>Payment</h2>
          <label>
            Notes for delivery
            <Input
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="e.g., leave at the front desk"
            />
          </label>
          <label>
            Payment provider
            <Select value={provider} onChange={(event) => setProvider(event.target.value as PaymentProvider)}>
              {PROVIDERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </label>
          <Button onClick={() => void handleCheckout()} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Place order'}
          </Button>
          {orderId && <p className="muted">Order ID: {orderId}</p>}
          {paymentId && <p className="muted">Payment ID: {paymentId}</p>}
          {paymentStatus && (
            <p>
              Payment status: <strong>{paymentStatus.status}</strong>
            </p>
          )}
        </Card>
      </div>
    </Container>
  );
};
