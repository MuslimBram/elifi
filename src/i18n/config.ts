import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import sq from "./locales/sq.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const supportedLanguages = [
  { code: "sq", name: "Shqip", flag: "🇦🇱" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
  { code: "sr", name: "Српски", flag: "🇷🇸" },
  { code: "bs", name: "Bosanski", flag: "🇧🇦" },
  { code: "mk", name: "Македонски", flag: "🇲🇰" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Melayu", flag: "🇲🇾" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
];

export const rtlLanguages = ["ar", "ur", "fa"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sq: { translation: sq },
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "sq",
    supportedLngs: supportedLanguages.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = rtlLanguages.includes(lng) ? "rtl" : "ltr";
});

export default i18n;
