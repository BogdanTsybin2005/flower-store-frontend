"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../features/auth/model/authStore";
import { useTranslations } from "../shared/i18n";
import { Container } from "../shared/ui/Container";
import { Card } from "../shared/ui/Card";
import { Input } from "../shared/ui/Input";
import { Button } from "../shared/ui/Button";
import { Alert } from "../shared/ui/Alert";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginPage = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { t } = useTranslations();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Invalid input.");
      return;
    }
    try {
      setIsLoading(true);
      await login(form);
      router.push("/profile");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="stack">
      <Card className="stack">
        <h1>{t("auth.login")}</h1>
        {error && <Alert>{error}</Alert>}
        <label>
          {t("auth.email")}
          <Input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </label>
        <label>
          {t("auth.password")}
          <Input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
        </label>
        <Button onClick={() => void handleSubmit()} disabled={isLoading}>
          {isLoading ? t("common.loading") : t("auth.login")}
        </Button>
      </Card>
    </Container>
  );
};
