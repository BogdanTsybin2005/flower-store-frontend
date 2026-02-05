"use client";

import Link from "next/link";
import { useTranslations } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function MaintenancePage() {
  const { t } = useTranslations();
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1>🔧 {t("pages.maintenance.title")}</h1>
        <h2>{t("pages.notFound.backHome")}</h2>
        <p className="muted">{t("pages.maintenance.message")}</p>
        <p className="muted">
          <strong>Need help?</strong> Contact us at support@flowerstore.com
        </p>
      </Card>
      <Card className="stack">
        <p style={{ textAlign: "center", color: "#999", fontSize: "0.9rem" }}>
          Last updated: {new Date().toLocaleString()}
        </p>
      </Card>
    </Container>
  );
}
