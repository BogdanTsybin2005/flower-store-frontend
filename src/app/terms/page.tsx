import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function TermsPage() {
  return (
    <Container className="stack">
      <h1>Terms of Service</h1>

      <Card className="stack">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Flower Store. These terms and conditions govern your use of
          our website and services. By accessing or using this site, you agree
          to be bound by these terms.
        </p>
      </Card>

      <Card className="stack">
        <h2>2. Products and Services</h2>
        <p>
          All products are sold as described. Prices are subject to change
          without notice. We reserve the right to refuse or cancel any order.
        </p>
      </Card>

      <Card className="stack">
        <h2>3. Delivery and Returns</h2>
        <p>
          We aim to deliver orders within 24–48 hours. For issues with your
          order, contact support within 24 hours of delivery.
        </p>
      </Card>

      <Card className="stack">
        <h2>4. Limitation of Liability</h2>
        <p>
          Flower Store is not liable for indirect, incidental, or consequential
          damages arising from your use of our services.
        </p>
      </Card>

      <Card className="stack">
        <h2>5. Changes to Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the site
          constitutes acceptance of any changes.
        </p>
      </Card>

      <Card className="stack">
        <h2>Contact</h2>
        <p>
          For questions, contact us at support@flowerstore.com or{" "}
          <Link href="/messages">chat with support</Link>.
        </p>
      </Card>
    </Container>
  );
}
