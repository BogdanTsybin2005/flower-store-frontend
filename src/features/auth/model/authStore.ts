import { create } from 'zustand';
import { api } from '../../../shared/api';
import type { LoginRequest, RegisterRequest, TokenResponse } from '../../../shared/api/types';

const TOKEN_KEY = 'flower-store-token';
const USER_KEY = 'flower-store-user-id';

interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => void;
}

const persistSession = (token: string | null, userId: string | null) => {
  if (token && userId) {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, userId);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
};

const applyAuthResponse = (
  set: (state: Partial<AuthState>) => void,
  response: TokenResponse
) => {
  persistSession(response.access_token, response.user_id);
  set({
    token: response.access_token,
    userId: response.user_id,
    isAuthenticated: true,
  });
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  userId: null,
  isAuthenticated: false,
  hydrate: () => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const userId = sessionStorage.getItem(USER_KEY);
    if (token && userId) {
      set({ token, userId, isAuthenticated: true });
    }
  },
  login: async (payload) => {
    const response = await api.auth.login(payload);
    applyAuthResponse(set, response);
  },
  register: async (payload) => {
    const response = await api.auth.register(payload);
    applyAuthResponse(set, response);
  },
  logout: async () => {
    await api.auth.logout(get().token);
    persistSession(null, null);
    set({ token: null, userId: null, isAuthenticated: false });
  },
}));
