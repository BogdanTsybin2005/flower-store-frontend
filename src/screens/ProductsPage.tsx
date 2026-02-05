"use client";

import { useEffect } from "react";
import { api } from "../shared/api";
import { useAsync } from "../shared/hooks/useAsync";
import { useTranslations } from "../shared/i18n";
import { Container } from "../shared/ui/Container";
import { Loader } from "../shared/ui/Loader";
import { Alert } from "../shared/ui/Alert";
import { ProductCard } from "../entities/product/ui/ProductCard";
import { useCartStore } from "../features/cart/model/cartStore";

export const ProductsPage = () => {
  const { data, error, isLoading, execute } = useAsync(api.products.list);
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useTranslations();

  useEffect(() => {
    void execute();
  }, [execute]);

  return (
    <Container className="stack">
      <div className="stack">
        <h1>{t("products.title")}</h1>
        <p className="muted">{t("products.description")}</p>
      </div>
      {isLoading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {!isLoading && !error && (!data || data.length === 0) && (
        <Alert>{t("products.noBrowse")}</Alert>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="grid grid-3">
          {data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      )}
    </Container>
  );
};
