"use client";

import Link from "next/link";
import { useTranslations } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function NotFound() {
  const { t } = useTranslations();
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>404</h1>
        <h2>{t("pages.notFound.title")}</h2>
        <p className="muted">{t("pages.notFound.message")}</p>
      </Card>
      <Card className="stack">
        <Link href="/">← {t("pages.notFound.backHome")}</Link>
        <Link href="/">{t("header.products")}</Link>
      </Card>
    </Container>
  );
}
