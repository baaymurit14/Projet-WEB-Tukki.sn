import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesFr from './locales/fr.json';
import resourcesWolof from './locales/wo.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: resourcesFr,
      wo: resourcesWolof
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;