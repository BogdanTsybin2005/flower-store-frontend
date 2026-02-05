"use client";

import Link from "next/link";
import { useTranslations } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function UnauthorizedPage() {
  const { t } = useTranslations();
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>403</h1>
        <h2>{t("pages.unauthorized.title")}</h2>
        <p className="muted">{t("pages.unauthorized.message")}</p>
      </Card>
      <Card className="stack">
        <Link href="/login">{t("pages.unauthorized.login")}</Link>
        <Link href="/">← {t("pages.notFound.backHome")}</Link>
      </Card>
    </Container>
  );
}
