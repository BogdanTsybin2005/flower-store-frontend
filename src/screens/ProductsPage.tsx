'use client';

import { useEffect } from 'react';
import { api } from '../shared/api';
import { useAsync } from '../shared/hooks/useAsync';
import { Container } from '../shared/ui/Container';
import { Loader } from '../shared/ui/Loader';
import { Alert } from '../shared/ui/Alert';
import { ProductCard } from '../entities/product/ui/ProductCard';
import { useCartStore } from '../features/cart/model/cartStore';

export const ProductsPage = () => {
  const { data, error, isLoading, execute } = useAsync(api.products.list);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    void execute();
  }, [execute]);

  return (
    <Container className="stack">
      <div className="stack">
        <h1>Browse fresh flowers</h1>
        <p className="muted">Curated bouquets and seasonal arrangements delivered fast.</p>
      </div>
      {isLoading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {!isLoading && !error && (!data || data.length === 0) && (
        <Alert>No flowers available at the moment. Please check back later!</Alert>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="grid grid-3">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
          ))}
        </div>
      )}
    </Container>
  );
};
