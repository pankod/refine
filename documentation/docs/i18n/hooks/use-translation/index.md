---
title: "useTranslation Hook | Best Practices for Usage & Patterns in Refine v5"
display_title: "useTranslation"
sidebar_label: "useTranslation"
description: "Explore how to use the useTranslation hook in Refine v5. Learn best practices for localization, translations for real-world React admin panels."
---

The `useTranslation` hook, allows you to use call `translate`, `changeLocale`, and `getLocale` methods from the [`i18nProvider`](/core/docs/i18n/i18n-provider/) that you provided. It can be used to translate texts, change the locale, and get the current locale in your own components.

## Usage

> This hook can only be used if [`i18nProvider`](/core/docs/i18n/i18n-provider/) is provided.

```tsx
import { useTranslation } from "@refinedev/core";

export const MyComponent = () => {
  const { translate, getLocale, changeLocale } = useTranslation();
  const currentLocale = getLocale();

  return (
    <div>
      <h1>{translate("languages")}</h1>
      <button
        onClick={() => changeLocale("en")}
        disabled={currentLocale === "en"}
      >
        English
      </button>
      <button
        onClick={() => changeLocale("de")}
        disabled={currentLocale === "de"}
      >
        German
      </button>
    </div>
  );
};
```

## translate

If you need to translate the texts in your own components, you can use `translate` method. It calls the `translate` method from [`i18nProvider`](/core/docs/i18n/i18n-provider/) under the hood.

```tsx
import { useTranslate } from "@refinedev/core";

export const MyComponent = () => {
  const translate = useTranslate();

  return <button>{translate("my.translate.text")}</button>;
};
```

## changeLocale

If you need to change the locale at runtime, you can use the `changeLocale` method. It calls the `changeLocale` method from [`i18nProvider`](/core/docs/i18n/i18n-provider/) under the hood.

```tsx
import { useSetLocale } from "@refinedev/core";

export const LanguageSwicher = () => {
  const { changeLocale } = useTranslation();

  return (
    <div>
      <span>Languages</span>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Spanish</button>
    </div>
  );
};
```

## getLocale

If you need to know the current locale, you can use the `getLocale` method. It calls the `getLocale` method from [`i18nProvider`](/core/docs/i18n/i18n-provider/) under the hood.

```tsx
import { useSetLocale } from "@refinedev/core";

export const LanguageSwicher = () => {
  const { getLocale } = useTranslation();

  return <h1>Current Locale: {getLocale()}</h1>;
};
```
