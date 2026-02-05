'use client';

import Link from 'next/link';
import { Container } from '@/shared/ui/Container';
import { Card } from '@/shared/ui/Card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="stack">
      <Card className="stack" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>500</h1>
        <h2>Server Error</h2>
        <p className="muted">
          Something went wrong. Our team has been notified.
        </p>
        {error.message && (
          <p className="muted" style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
            {error.message}
          </p>
        )}
      </Card>
      <Card className="stack">
        <button onClick={() => reset()} style={{ padding: '0.5rem', cursor: 'pointer' }}>
          Try Again
        </button>
        <Link href="/">← Back to Home</Link>
      </Card>
    </Container>
  );
}
