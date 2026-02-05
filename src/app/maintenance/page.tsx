import Link from 'next/link';
import { Container } from '@/shared/ui/Container';
import { Card } from '@/shared/ui/Card';

export default function MaintenancePage() {
  return (
    <Container className="stack">
      <Card className="stack" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1>🔧 Under Maintenance</h1>
        <h2>We'll Be Back Soon</h2>
        <p className="muted">
          We're currently performing scheduled maintenance to improve your experience.
          Please check back in a few hours.
        </p>
        <p className="muted">
          <strong>Need help?</strong> Contact us at support@flowerstore.com
        </p>
      </Card>
      <Card className="stack">
        <p style={{ textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
          Last updated: {new Date().toLocaleString()}
        </p>
      </Card>
    </Container>
  );
}
