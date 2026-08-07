---
title: "I18n Provider Guide | Best Practices in Refine v5"
display_title: "i18n Provider"
sidebar_label: "i18n Provider"
description: "Explore how to implement i18n Provider in Refine v5. Learn best practices for translation and expects for real-world React admin panels."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TranslationFileEN from '../../partials/\_partial-translation-file-en.md';

# i18n Provider <GuideBadge id="guides-concepts/i18n" />

Internationalization (i18n) is a process that allows software applications to be localized for different regions and languages. Refine can work with any i18n framework, but needs an `i18nProvider` to be created based on the chosen library.

Refine expects the `i18nProvider` type as follows:

```ts
import { I18nProvider } from "@refinedev/core";

const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => string,
  changeLocale: (lang: string, options?: any) => Promise,
  getLocale: () => string,
};
```

After creating a `i18nProvider`, you can pass it to the `<Refine />` component:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import i18nProvider from "./i18nProvider";

const App: React.FC = () => {
  return (
    <Refine
      // highlight-next-line
      i18nProvider={i18nProvider}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

This will allow us to put translation features to the [`useTranslation`][use-translation] hook

## Methods

### translate

`translate` takes parameters and passes them to the provided `i18nProvider` and expects a string as a return value.

It has two [function signatures](https://developer.mozilla.org/en-US/docs/Glossary/Signature/Function) with different parameters, which is known as function overloading.

```ts
function translate(key: string, options?: any, defaultMessage?: string): string;
function translate(key: string, defaultMessage?: string): string;
```

It means that you can use it in two different ways. The first one is to pass the `key`, `options`, and, `defaultMessage` as parameters. The second one is to pass the `key` and `defaultMessage` parameters. The `options` parameter is optional.

- Example of the `key` and `defaultMessage` function signature

```tsx
import { I18nProvider } from "@refinedev/core";
import { useTranslation } from "react-i18next";

// ...

const { t } = useTranslation();

const i18nProvider: I18nProvider = {
  translate: (key: string, defaultMessage?: string) => t(key, defaultMessage),
  // ...
};

// ...
```

```tsx
import { useTranslation } from "@refinedev/core";

// ...

const { translate } = useTranslation();

// ...

translate("posts.fields.title", "Title");

// ...
```

- Example of the `key`, `options` and, `defaultMessage` function signature

```tsx
import { I18nProvider } from "@refinedev/core";
import { useTranslation } from "react-i18next";

// ...

const { t } = useTranslation();

const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) =>
    t(key, defaultMessage, options),
  // ...
};

// ...
```

```tsx
import { useTranslation } from "@refinedev/core";

// ...

const { translate } = useTranslation();

// ...

const title = translate("posts.fields.title", { ns: "resources" }, "Title");

// ...
```

You can use the [`useTranslation`][use-translation] hook to call `translate` method.

### changeLocale

`translate` takes parameters and passes them to the provided `i18nProvider` and expects a Promise as a return value.

```ts
changeLocale: (locale: string, options?: any) => Promise<any>;
```

You can use the [`useTranslation`][use-translation] hook to call `changeLocale` method.

### getLocale

`getLocale` expects a string as a return value. It should return the current locale from your `i18nProvider`.

```ts
getLocale: () => string;
```

You can use the [`useTranslation`][use-translation] hook to call `getLocale` method.

## Translation file

All of Refine's components supports `i18n`, meaning that if you want to change their text, you can create your own translation files to override Refine's default texts.

Here is the list of all translation keys that you can override:

<details>
<summary>Show translation file</summary>

<TranslationFileEN />

</details>

## FAQ

### How can I create translation files for other languages in an automated way?

You can use the following community example project as a starting point for incorporating automated translations. The project adds deepl-translate-github-action which uses DeepL, an AI translation service to translate your locales json.

- [refine-i18n-react](https://github.com/lyqht/refine-i18n-react)

## Example

<CodeSandboxExample path="i18n-react" />

[i18nnextjs]: /core/docs/examples/i18n/i18n-nextjs
[react-i18next]: https://react.i18next.com/
[create-refine-app]: /core/docs/getting-started/quickstart
[use-translation]: /core/docs/i18n/hooks/use-translation
