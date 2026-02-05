"use client";

import { useTranslations } from "@/shared/i18n";

export default function I18nTestPage() {
  const { t, language, setLanguage } = useTranslations();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>i18n System Test</h1>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
        }}
      >
        <p>
          <strong>Current Language:</strong> {language}
        </p>
        <p>
          <strong>Button Text:</strong> {t("common.save")}
        </p>
        <p>
          <strong>Products Title:</strong> {t("products.title")}
        </p>
        <p>
          <strong>Header Home:</strong> {t("header.home")}
        </p>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => {
            console.log("Test: Setting language to RU");
            setLanguage("ru");
          }}
          style={{
            padding: "0.5rem 1rem",
            marginRight: "0.5rem",
            backgroundColor: language === "ru" ? "#333" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Set RU
        </button>
        <button
          onClick={() => {
            console.log("Test: Setting language to EN");
            setLanguage("en");
          }}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: language === "en" ? "#333" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Set EN
        </button>
      </div>

      <div style={{ marginTop: "2rem", fontSize: "0.85rem", color: "#666" }}>
        <p>
          Проверьте консоль браузера (F12 → Console) для логов переключения
          языков.
        </p>
        <p>Check browser console (F12 → Console) for language switch logs.</p>
      </div>
    </div>
  );
}
