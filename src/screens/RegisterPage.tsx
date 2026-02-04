'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../features/auth/model/authStore';
import { Container } from '../shared/ui/Container';
import { Card } from '../shared/ui/Card';
import { Input } from '../shared/ui/Input';
import { Button } from '../shared/ui/Button';
import { Alert } from '../shared/ui/Alert';

const schema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(6),
  address: z.string().min(5),
});

export const RegisterPage = () => {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? 'Invalid input.');
      return;
    }
    try {
      setIsLoading(true);
      await register(form);
      router.push('/profile');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="stack">
      <Card className="stack">
        <h1>Create your account</h1>
        {error && <Alert>{error}</Alert>}
        <label>
          Full name
          <Input
            value={form.full_name}
            onChange={(event) => setForm({ ...form, full_name: event.target.value })}
          />
        </label>
        <label>
          Email
          <Input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
        <label>
          Password
          <Input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>
        <label>
          Phone
          <Input
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
        </label>
        <label>
          Address
          <Input
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
          />
        </label>
        <Button onClick={() => void handleSubmit()} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Register'}
        </Button>
      </Card>
    </Container>
  );
};
