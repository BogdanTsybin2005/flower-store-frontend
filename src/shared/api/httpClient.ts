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
  // Use public NEXT_PUBLIC_API_BASE_URL injected by Next.js at build time.
  // Prefer process.env so the value is inlined into the client bundle.
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL as string) ?? ENV.API_BASE_URL ?? '';

  if (!base) {
    // Clear, actionable error to avoid silent fallback to relative requests (which hit Next.js and return 404).
    // Do not hardcode a production URL here — fix the environment instead.
    // eslint-disable-next-line no-console
    console.error(
      'Missing API base URL: set NEXT_PUBLIC_API_BASE_URL in .env.local and restart the dev server.'
    );
    throw new ApiError(
      'Missing API base URL. Configure NEXT_PUBLIC_API_BASE_URL and restart the dev server.',
      0
    );
  }

  const url = `${base}${path}`;
  // DEBUG: log base and request URL to help diagnose env loading issues
  // (remove this log once env is confirmed working)
  // eslint-disable-next-line no-console
  console.log('API Request:', url, 'ENV.API_BASE_URL=', ENV.API_BASE_URL, 'usedBase=', base);
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
