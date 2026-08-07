"use client";

import { useTranslation } from "@refinedev/core";

const locales = [
  {
    value: "en",
    label: "English",
    icon: "🇬🇧",
  },
  {
    value: "de",
    label: "Deutsch",
    icon: "🇩🇪",
  },
];

export const SelectLanguage = () => {
  const { getLocale, changeLocale } = useTranslation();
  const currentLocale = getLocale();

  return (
    <div>
      <select
        value={currentLocale}
        onChange={(e) => changeLocale(e.target.value)}
      >
        {locales.map((locale) => (
          <option key={locale.value} value={locale.value}>
            {locale.label} {locale.icon}
          </option>
        ))}
      </select>
    </div>
  );
};
