import HttpApi from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng:"ar-eg",
    fallbackLng:"en",
    interpolation: {
      format: (value, format, lng) => {
        if(lng === "arab")
        {
          lng="ar-eg"
        }
        else 
          lng="eg"

        if (format === "date") {
          return new Intl.DateTimeFormat(lng,{
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(value);
        }

        if (format === "time")
        return new Intl.DateTimeFormat(lng,{
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(value);

        if (format === "number") {
        
          return new Intl.NumberFormat(lng).format(value);
        }
        return value;
      }, escapeValue: false
    },
    backend:{
      loadPath:'/assets/locales/{{lng}}/translations.json'
    },
  });
export default i18n;
