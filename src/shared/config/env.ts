const getEnv = (key: string, fallback?: string) => {
  const value = import.meta.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value as string;
};

export const ENV = {
  API_BASE_URL: getEnv('VITE_API_BASE_URL'),
  API_TIMEOUT_MS: Number(getEnv('VITE_API_TIMEOUT_MS', '10000')),
};
