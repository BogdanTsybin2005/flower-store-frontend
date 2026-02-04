import { ENV } from '../config/env';

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export interface RequestOptions extends RequestInit {
  authToken?: string | null;
}

const timeoutFetch = async (input: RequestInfo | URL, init: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ENV.API_TIMEOUT_MS);

  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    return response;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const request = async <T>(
  path: string,
  { authToken, headers, ...init }: RequestOptions = {}
): Promise<T> => {
  const url = `${ENV.API_BASE_URL}${path}`;
  const response = await timeoutFetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.detail?.[0]?.msg ?? payload?.message ?? 'Request failed.';
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
};
