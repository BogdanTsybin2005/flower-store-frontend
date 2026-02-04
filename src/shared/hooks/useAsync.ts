import { useCallback, useState } from 'react';

export const useAsync = <T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fn(...args);
        setData(response);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong.';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fn]
  );

  return { data, error, isLoading, execute, setData };
};
