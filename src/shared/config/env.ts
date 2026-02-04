const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  return (value ?? '') as string;
};

export const ENV = {
  API_BASE_URL: getEnv('NEXT_PUBLIC_API_BASE_URL', ''),
  API_TIMEOUT_MS: Number(getEnv('NEXT_PUBLIC_API_TIMEOUT_MS', '10000')),
};
