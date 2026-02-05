import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function NotFound() {
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>404</h1>
        <h2>Page Not Found</h2>
        <p className="muted">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
      </Card>
      <Card className="stack">
        <Link href="/">← Back to Home</Link>
        <Link href="/products">Browse Products</Link>
      </Card>
    </Container>
  );
}
