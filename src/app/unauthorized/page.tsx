import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function UnauthorizedPage() {
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>403</h1>
        <h2>Access Denied</h2>
        <p className="muted">You don't have permission to access this page.</p>
      </Card>
      <Card className="stack">
        <Link href="/login">Login to Continue</Link>
        <Link href="/">← Back to Home</Link>
      </Card>
    </Container>
  );
}
