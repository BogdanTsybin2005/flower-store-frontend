import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function AboutPage() {
  return (
    <Container className="stack">
      <h1>About Flower Store</h1>

      <Card className="stack">
        <h2>Our Mission</h2>
        <p>
          We deliver fresh, beautiful flowers and seasonal arrangements to
          brighten your day. Every bouquet is carefully curated by our expert
          florists.
        </p>
      </Card>

      <Card className="stack">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>🌸 Fresh flowers sourced daily</li>
          <li>🚚 Fast, reliable delivery</li>
          <li>💐 Custom arrangements available</li>
          <li>👥 Dedicated customer support</li>
        </ul>
      </Card>

      <Card className="stack">
        <h2>Contact & Support</h2>
        <p>
          <strong>Email:</strong> support@flowerstore.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p>
          <strong>Hours:</strong> Monday–Sunday, 9AM–6PM
        </p>
        <p>
          <Link href="/messages">Chat with support</Link> or{" "}
          <Link href="/faq">view FAQ</Link>
        </p>
      </Card>
    </Container>
  );
}
