"use client";

import { useTranslations } from "@/shared/i18n";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslations();

  const handleLanguageChange = (lang: "ru" | "en") => {
    console.log("Switching language to:", lang);
    setLanguage(lang);
    console.log("Language changed, current:", language);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <button
        onClick={() => handleLanguageChange("ru")}
        style={{
          padding: "0.4rem 0.8rem",
          border: language === "ru" ? "2px solid #333" : "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          backgroundColor: language === "ru" ? "#f0f0f0" : "transparent",
          fontWeight: language === "ru" ? "bold" : "normal",
          fontSize: "0.9rem",
        }}
      >
        РУ
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        style={{
          padding: "0.4rem 0.8rem",
          border: language === "en" ? "2px solid #333" : "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          backgroundColor: language === "en" ? "#f0f0f0" : "transparent",
          fontWeight: language === "en" ? "bold" : "normal",
          fontSize: "0.9rem",
        }}
      >
        EN
      </button>
    </div>
  );
};
