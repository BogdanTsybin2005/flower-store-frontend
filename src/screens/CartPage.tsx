"use client";

import Link from "next/link";
import { Container } from "../shared/ui/Container";
import { Card } from "../shared/ui/Card";
import { Button } from "../shared/ui/Button";
import { Input } from "../shared/ui/Input";
import { useTranslations } from "../shared/i18n";
import { formatCurrency } from "../shared/lib/format";
import { calculateSubtotal } from "../shared/lib/cart";
import { useCartStore } from "../features/cart/model/cartStore";

export const CartPage = () => {
  const { items, updateItem, removeItem } = useCartStore();
  const { t } = useTranslations();
  const subtotal = calculateSubtotal(items);

  return (
    <Container className="stack">
      <h1>{t("cart.title")}</h1>
      {items.length === 0 && (
        <Card className="stack">
          <p>{t("cart.empty")}</p>
          <Link href="/">{t("cart.browseProducts")}</Link>
        </Card>
      )}
      {items.map((item) => (
        <Card className="stack" key={item.product.id}>
          <div className="inline" style={{ justifyContent: "space-between" }}>
            <strong>{item.product.name}</strong>
            <Button onClick={() => removeItem(item.product.id)}>
              {t("cart.remove")}
            </Button>
          </div>
          <p className="muted">
            {formatCurrency(item.product.price_cents, item.product.currency)}
          </p>
          <div className="inline">
            <label>
              {t("cart.quantity")}
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) =>
                  updateItem(item.product.id, Number(event.target.value))
                }
              />
            </label>
          </div>
        </Card>
      ))}
      {items.length > 0 && (
        <Card className="stack">
          <strong>
            {t("cart.subtotal")} {formatCurrency(subtotal)}
          </strong>
          <Link href="/checkout">{t("cart.proceedCheckout")}</Link>
        </Card>
      )}
    </Container>
  );
};
