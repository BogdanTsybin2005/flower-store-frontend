import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function OrderSuccessPage() {
  return (
    <Container className="stack">
      <Card className="stack" style={{ textAlign: "center" }}>
        <h1>✓ Order Placed!</h1>
        <p>Thank you for your order. We'll process it shortly.</p>
        <p className="muted">Check your email for confirmation details.</p>
      </Card>
      <Card className="stack">
        <Link href="/orders">View your orders</Link>
        <Link href="/products">Continue shopping</Link>
      </Card>
    </Container>
  );
}
