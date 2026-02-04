export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: string;
}

export interface RegisterResponse {
  access_token: string;
  token_type: string;
  user_id: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user_id: string;
}

export interface ProductOut {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  compare_at_price_cents: number | null;
  currency: string;
  stock: number;
  reserved_stock: number;
  low_stock_threshold: number;
  weight_grams: number | null;
  is_active: boolean;
  is_featured: boolean;
}

export interface OrderOut {
  id: string;
  order_number: number | null;
  client_id: string;
  subtotal_cents: number;
  discount_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  currency: string;
  status: string;
  notes: string | null;
  internal_notes: string | null;
}

export interface OrderCreate {
  client_id: string;
  subtotal_cents: number;
  total_cents: number;
  currency?: string;
  discount_cents?: number;
  shipping_cents?: number;
  tax_cents?: number;
  status?: string;
  notes?: string | null;
  internal_notes?: string | null;
}

export type PaymentProvider = 'manual' | 'bank_transfer' | 'card' | 'crypto';
export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export interface PaymentCreate {
  order_id: string;
  amount_cents: number;
  currency?: string;
  provider?: PaymentProvider;
}

export interface PaymentOut {
  id: string;
  order_id: string;
  provider: string;
  status: string;
  amount_cents: number;
  currency: string;
  provider_payload: Record<string, unknown> | null;
  provider_payment_id: string | null;
}

export interface PaymentStatusOut {
  id: string;
  status: PaymentStatus;
}

export interface MessageOut {
  id: string;
  session_id: string;
  client_id: string | null;
  support_id: string | null;
  content: string;
  chat_type: string;
  is_from_client: boolean;
  is_read: boolean;
  metadata_json: Record<string, unknown> | null;
}

export interface MessageCreate {
  session_id: string;
  content: string;
  chat_type?: string;
  is_from_client?: boolean;
  client_id?: string | null;
  support_id?: string | null;
  metadata?: Record<string, unknown> | null;
}

export interface User {
  id: string;
  role: string;
  is_active: boolean;
  exists: boolean;
  full_name: string | null;
}

export interface HTTPValidationError {
  detail?: Array<{ loc: Array<string | number>; msg: string; type: string }>;
}
