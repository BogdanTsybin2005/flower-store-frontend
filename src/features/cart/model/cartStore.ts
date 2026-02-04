import { create } from 'zustand';
import type { ProductOut } from '../../../shared/api/types';

const CART_KEY = 'flower-store-cart';

export interface CartItem {
  product: ProductOut;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: ProductOut) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  hydrate: () => void;
}

const persistCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  hydrate: () => {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as CartItem[];
      set({ items: parsed });
    } catch {
      localStorage.removeItem(CART_KEY);
    }
  },
  addItem: (product) => {
    const items = [...get().items];
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }
    persistCart(items);
    set({ items });
  },
  updateItem: (productId, quantity) => {
    const items = get().items
      .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);
    persistCart(items);
    set({ items });
  },
  removeItem: (productId) => {
    const items = get().items.filter((item) => item.product.id !== productId);
    persistCart(items);
    set({ items });
  },
  clear: () => {
    localStorage.removeItem(CART_KEY);
    set({ items: [] });
  },
}));
