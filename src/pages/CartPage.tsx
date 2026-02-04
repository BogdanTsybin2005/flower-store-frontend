import { Link } from 'react-router-dom';
import { Container } from '../shared/ui/Container';
import { Card } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button';
import { Input } from '../shared/ui/Input';
import { formatCurrency } from '../shared/lib/format';
import { calculateSubtotal } from '../shared/lib/cart';
import { useCartStore } from '../features/cart/model/cartStore';

export const CartPage = () => {
  const { items, updateItem, removeItem } = useCartStore();
  const subtotal = calculateSubtotal(items);

  return (
    <Container className="stack">
      <h1>Your cart</h1>
      {items.length === 0 && (
        <Card className="stack">
          <p>Your cart is empty.</p>
          <Link to="/">Browse products</Link>
        </Card>
      )}
      {items.map((item) => (
        <Card className="stack" key={item.product.id}>
          <div className="inline" style={{ justifyContent: 'space-between' }}>
            <strong>{item.product.name}</strong>
            <Button onClick={() => removeItem(item.product.id)}>Remove</Button>
          </div>
          <p className="muted">{formatCurrency(item.product.price_cents, item.product.currency)}</p>
          <div className="inline">
            <label>
              Quantity
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
          <strong>Subtotal: {formatCurrency(subtotal)}</strong>
          <Link to="/checkout">Proceed to checkout</Link>
        </Card>
      )}
    </Container>
  );
};
