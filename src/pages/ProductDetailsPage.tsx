import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../shared/api';
import { useAsync } from '../shared/hooks/useAsync';
import { Container } from '../shared/ui/Container';
import { Loader } from '../shared/ui/Loader';
import { Alert } from '../shared/ui/Alert';
import { Button } from '../shared/ui/Button';
import { Card } from '../shared/ui/Card';
import { formatCurrency } from '../shared/lib/format';
import { useCartStore } from '../features/cart/model/cartStore';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, execute } = useAsync(api.products.list);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    void execute();
  }, [execute]);

  const product = data?.find((item) => item.id === id);

  return (
    <Container className="stack">
      {isLoading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {!isLoading && !product && <Alert>We could not find this product.</Alert>}
      {product && (
        <Card className="stack">
          <h1>{product.name}</h1>
          <p className="muted">SKU: {product.sku}</p>
          <p>{product.description || 'Fresh seasonal blooms.'}</p>
          <strong>{formatCurrency(product.price_cents, product.currency)}</strong>
          <p className="muted">Stock available: {product.stock - product.reserved_stock}</p>
          <Button onClick={() => addItem(product)}>Add to cart</Button>
        </Card>
      )}
    </Container>
  );
};
