import type { CartItem } from '../../features/cart/model/cartStore';

export const calculateSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.product.price_cents * item.quantity, 0);
