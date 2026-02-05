import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function PrivacyPage() {
  return (
    <Container className="stack">
      <h1>Privacy Policy</h1>

      <Card className="stack">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly, such as name, email, and
          shipping address. We may also collect usage data via cookies and
          analytics tools.
        </p>
      </Card>

      <Card className="stack">
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Communicate about orders and support</li>
          <li>Improve our services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Card>

      <Card className="stack">
        <h2>3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          personal data. However, no method is 100% secure.
        </p>
      </Card>

      <Card className="stack">
        <h2>4. Sharing Your Information</h2>
        <p>
          We do not sell or share your personal information with third parties,
          except as required by law or to fulfill your order.
        </p>
      </Card>

      <Card className="stack">
        <h2>5. Cookies</h2>
        <p>
          Our site uses cookies to enhance your experience. You can control
          cookie settings in your browser preferences.
        </p>
      </Card>

      <Card className="stack">
        <h2>6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data. Contact us at support@flowerstore.com.
        </p>
      </Card>

      <Card className="stack">
        <h2>7. Contact</h2>
        <p>
          For privacy concerns, contact us at support@flowerstore.com or{" "}
          <Link href="/messages">chat with support</Link>.
        </p>
      </Card>
    </Container>
  );
}
