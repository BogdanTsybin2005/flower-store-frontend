import { useLanguageStore } from './languageStore';

export const useTranslations = () => {
  const { t, language, setLanguage } = useLanguageStore();
  return { t, language, setLanguage };
};
