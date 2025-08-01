import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";
import translationOr from "./locales/or/translation.json";
import translationTi from "./locales/ti/translation.json";
import translationSi from "./locales/si/translation.json";
import translationSo from "./locales/so/translation.json";



function getStoredLanguage() {
  try {
    return localStorage.getItem('i18nextLng');
  } catch (error) {
    // console.error('Error retrieving stored language:', error);
    return null;
  }
}


i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: getStoredLanguage() || 'es',
    fallbackLng: "es",

    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translations: translationEn,
      },
      es: {
        translations: translationEs,
      },
      or: {
        translations: translationOr,
      },
      ti: {
        translations: translationTi,
      },
      si: {
        translations: translationSi,
      },
      so: {
        translations: translationSo,
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
  });

export default i18n;