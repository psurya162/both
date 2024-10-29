import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      title: "Choose Language",
      english: "English",
      hindi: "Hindi",
      cancel: "Cancel",
    },
  },
  hi: {
    translation: {
      title: "भाषा चुनें",
      english: "अंग्रेज़ी",
      hindi: "हिंदी",
      cancel: "रद्द करें",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already does escaping
    },
  });

export default i18n;
