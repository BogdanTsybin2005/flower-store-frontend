"use client";

import Link from "next/link";
import { useTranslations } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function OrderSuccessPage() {
  const { t } = useTranslations();
  return (
    <Container className="stack">
      <Card className="stack" style={{ textAlign: "center" }}>
        <h1>{t("checkout.orderPlaced")}</h1>
        <p>{t("checkout.confirmationEmail")}</p>
        <p className="muted">Check your email for confirmation details.</p>
      </Card>
      <Card className="stack">
        <Link href="/orders">{t("checkout.viewOrders")}</Link>
        <Link href="/">{t("cart.browseProducts")}</Link>
      </Card>
    </Container>
  );
}
