import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en.json';
import translationID from './locales/id.json';

// Definisikan tipe untuk resources
const resources = {
  en: { translation: translationEN },
  id: { translation: translationID },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Bahasa default jika tidak ditemukan
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
