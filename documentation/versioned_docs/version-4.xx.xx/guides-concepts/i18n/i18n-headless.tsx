import React from "react";
import { Sandpack } from "@site/src/components/sandpack";
import en from "./locales/en/common.json";
import de from "./locales/de/common.json";

export default function I18nExample() {
  return (
    <Sandpack
      height={460}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "react-i18next": "^11.8.11",
        i18next: "^20.1.0",
        "i18next-browser-languagedetector": "^6.1.1",
        "i18next-xhr-backend": "^3.2.2",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/home-page.tsx": {
          code: HomePageTsxCode,
          active: true,
        },
        "i18n.ts": {
          code: i18nTsxCode,
        },
        "/locales/en/common.json": {
          code: JSON.stringify(en, null, 2),
        },
        "/locales/de/common.json": {
          code: JSON.stringify(de, null, 2),
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { I18nProvider } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { HomePage } from "./home-page";

import "./i18n";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
      translate: (key: string, params: object) => {
          return t(key, params);
      },
      changeLocale: (lang: string) => i18n.changeLanguage(lang),
      getLocale: () => i18n.language,
  };

  return (
      <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          i18nProvider={i18nProvider}
      >
          <HomePage />
      </Refine>
  );
};

export default App;

`.trim();

const HomePageTsxCode = /* jsx */ `
import React from "react";
import { useTranslation } from "@refinedev/core";

export const HomePage = () => {
    const { translate, getLocale, changeLocale } = useTranslation();

    return (
        <div>
            <h1>{translate("page.home.title")}</h1>
            <select
                value={getLocale()}
                onChange={(e) => changeLocale(e.target.value)}
            >
                <option value="en">English</option>
                <option value="de">German</option>
            </select>
        </div>
    );
};

`.trim();

const i18nTsxCode = /* jsx */ `
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/common.json";
import de from "./locales/de/common.json";

i18n.use(initReactI18next).init({
    lng: "en",
    resources: {
        en: {
            translation: en,
        },
        de: {
            translation: de,
        },
    },
    supportedLngs: ["en", "de"],
    fallbackLng: ["en", "de"],
});

export default i18n;



`.trim();
