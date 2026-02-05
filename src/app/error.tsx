"use client";

import Link from "next/link";
import { useTranslations } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslations();
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>500</h1>
        <h2>{t("pages.error.title")}</h2>
        <p className="muted">{t("pages.error.message")}</p>
        {error.message && (
          <p
            className="muted"
            style={{ fontSize: "0.9rem", fontFamily: "monospace" }}
          >
            {error.message}
          </p>
        )}
      </Card>
      <Card className="stack">
        <button
          onClick={() => reset()}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          {t("pages.error.tryAgain")}
        </button>
        <Link href="/">← {t("pages.notFound.backHome")}</Link>
      </Card>
    </Container>
  );
}
