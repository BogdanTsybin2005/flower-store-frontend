import { request } from './httpClient';
import type {
  LoginRequest,
  TokenResponse,
  RegisterRequest,
  RegisterResponse,
  ProductOut,
  OrderCreate,
  OrderOut,
  PaymentCreate,
  PaymentOut,
  PaymentStatusOut,
  MessageCreate,
  MessageOut,
  User,
} from './types';

export const api = {
  auth: {
    register: (data: RegisterRequest) =>
      request<RegisterResponse>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    login: (data: LoginRequest) =>
      request<TokenResponse>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    logout: (token: string | null) =>
      request<void>('/api/v1/auth/logout', {
        method: 'POST',
        authToken: token,
      }),
  },
  products: {
    list: () => request<ProductOut[]>('/api/v1/products/'),
  },
  orders: {
    list: (token: string | null) =>
      request<OrderOut[]>('/api/v1/orders/', { authToken: token }),
    create: (payload: OrderCreate, token: string | null) =>
      request<OrderOut>('/api/v1/orders/', {
        method: 'POST',
        body: JSON.stringify(payload),
        authToken: token,
      }),
  },
  payments: {
    create: (payload: PaymentCreate, token: string | null) =>
      request<PaymentOut>('/api/v1/payments/', {
        method: 'POST',
        body: JSON.stringify(payload),
        authToken: token,
      }),
    status: (paymentId: string, token: string | null) =>
      request<PaymentStatusOut>(`/api/v1/payments/${paymentId}/status`, {
        authToken: token,
      }),
  },
  messages: {
    list: (token: string | null) =>
      request<MessageOut[]>('/api/v1/messages/', { authToken: token }),
    create: (payload: MessageCreate, token: string | null) =>
      request<MessageOut>('/api/v1/messages/', {
        method: 'POST',
        body: JSON.stringify(payload),
        authToken: token,
      }),
  },
  users: {
    list: (token: string | null) =>
      request<User[]>('/api/v1/users/', { authToken: token }),
  },
  health: {
    check: () => request<{ status: string }>('/api/v1/health/'),
  },
};
