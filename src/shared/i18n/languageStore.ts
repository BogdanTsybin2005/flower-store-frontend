import { create } from 'zustand';
import { ru } from './ru';
import { en } from './en';

export type Language = 'ru' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  hydrate: () => void;
  t: (key: string) => string;
}

const translations = { ru, en };

const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, prop) => current?.[prop], obj) || path;
};

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: 'ru', // Default language is Russian
  setLanguage: (lang: Language) => {
    console.log('useLanguageStore.setLanguage called with:', lang);
    set({ language: lang });
    // Only access localStorage on client side
    try {
      localStorage.setItem('LANGUAGE', lang);
      console.log('Language saved to localStorage:', lang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  },
  hydrate: () => {
    // Only run on client side
    try {
      const saved = localStorage.getItem('LANGUAGE') as Language | null;
      console.log('hydrate: Loaded language from localStorage:', saved);
      if (saved && (saved === 'ru' || saved === 'en')) {
        set({ language: saved });
        console.log('hydrate: Set language to:', saved);
      }
    } catch (e) {
      console.warn('Could not load language from localStorage', e);
    }
  },
  t: (key: string) => {
    const { language } = get();
    const dict = translations[language];
    return getNestedValue(dict, key);
  },
}));
