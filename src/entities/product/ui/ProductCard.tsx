'use client';

import Link from 'next/link';
import type { ProductOut } from '../../../shared/api/types';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { formatCurrency } from '../../../shared/lib/format';

interface ProductCardProps {
  product: ProductOut;
  onAddToCart: (product: ProductOut) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="stack">
      <div className="inline" style={{ justifyContent: 'space-between' }}>
        <h3>{product.name}</h3>
        {product.is_featured && <Badge>Featured</Badge>}
      </div>
      <p className="muted">{product.description || 'Fresh seasonal blooms.'}</p>
      <strong>{formatCurrency(product.price_cents, product.currency)}</strong>
      <div className="inline">
        <Link to={`/products/${product.id}`}>View details</Link>
        <Button onClick={() => onAddToCart(product)}>Add to cart</Button>
      </div>
    </Card>
  );
};
