import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function OfflinePage() {
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1>📡 Connection Lost</h1>
        <h2>You're Offline</h2>
        <p className="muted">
          Please check your internet connection and try again.
        </p>
      </Card>
      <Card className="stack">
        <button
          onClick={() => window.location.reload()}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          Retry
        </button>
        <Link href="/">← Back to Home</Link>
      </Card>
    </Container>
  );
}
