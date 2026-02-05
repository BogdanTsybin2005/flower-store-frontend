"use client";

import Link from "next/link";
import { useTranslations } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function OfflinePage() {
  const { t } = useTranslations();
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1>📡 {t("pages.offline.title")}</h1>
        <h2>{t("pages.offline.title")}</h2>
        <p className="muted">{t("pages.offline.message")}</p>
      </Card>
      <Card className="stack">
        <button
          onClick={() => window.location.reload()}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          {t("pages.offline.retry")}
        </button>
        <Link href="/">← {t("pages.notFound.backHome")}</Link>
      </Card>
    </Container>
  );
}
