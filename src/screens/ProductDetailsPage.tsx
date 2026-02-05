"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "../shared/api";
import { useAsync } from "../shared/hooks/useAsync";
import { useTranslations } from "../shared/i18n";
import { Container } from "../shared/ui/Container";
import { Loader } from "../shared/ui/Loader";
import { Alert } from "../shared/ui/Alert";
import { Button } from "../shared/ui/Button";
import { Card } from "../shared/ui/Card";
import { formatCurrency } from "../shared/lib/format";
import { useCartStore } from "../features/cart/model/cartStore";

export const ProductDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { data, error, isLoading, execute } = useAsync(api.products.list);
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useTranslations();

  useEffect(() => {
    void execute();
  }, [execute]);

  const product = data?.find((item) => item.id === id);

  return (
    <Container className="stack">
      {isLoading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {!isLoading && !product && <Alert>{t("products.noBrowse")}</Alert>}
      {product && (
        <Card className="stack">
          <h1>{product.name}</h1>
          <p className="muted">SKU: {product.sku}</p>
          <p>{product.description || "Fresh seasonal blooms."}</p>
          <strong>
            {formatCurrency(product.price_cents, product.currency)}
          </strong>
          <p className="muted">
            Stock available: {product.stock - product.reserved_stock}
          </p>
          <Button onClick={() => addItem(product)}>
            {t("products.addToCart")}
          </Button>
        </Card>
      )}
    </Container>
  );
};
