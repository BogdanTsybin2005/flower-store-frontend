"use client";

import Link from "next/link";
import type { ProductOut } from "../../../shared/api/types";
import { useTranslations } from "../../../shared/i18n";
import { Card } from "../../../shared/ui/Card";
import { Badge } from "../../../shared/ui/Badge";
import { Button } from "../../../shared/ui/Button";
import { formatCurrency } from "../../../shared/lib/format";

interface ProductCardProps {
  product: ProductOut;
  onAddToCart: (product: ProductOut) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { t } = useTranslations();
  return (
    <Card className="stack">
      <div className="inline" style={{ justifyContent: "space-between" }}>
        <h3>{product.name}</h3>
        {product.is_featured && <Badge>{t("products.featured")}</Badge>}
      </div>
      <p className="muted">{product.description || "Fresh seasonal blooms."}</p>
      <strong>{formatCurrency(product.price_cents, product.currency)}</strong>
      <div className="inline">
        <Link href={`/products/${product.id}`}>
          {t("products.viewDetails")}
        </Link>
        <Button onClick={() => onAddToCart(product)}>
          {t("products.addToCart")}
        </Button>{" "}
      </div>
    </Card>
  );
};
