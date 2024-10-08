// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "innovation_services": "Innovation Services",
      "search_innovations": "Search Innovations",
      "references": "References",
      "news": "News",
      "welcome_message": "Welcome to the Innovation Platform",
    }
  },
  id: {
    translation: {
      "home": "Beranda",
      "innovation_services": "Layanan Inovasi",
      "search_innovations": "Cari Inovasi",
      "references": "Referensi",
      "news": "Berita",
      "welcome_message": "Selamat datang di Platform Inovasi",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set bahasa default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
