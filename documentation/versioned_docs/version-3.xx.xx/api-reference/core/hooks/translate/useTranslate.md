If you need to translate the texts in your own components, refine provides the `useTranslate` hook, It returns the translate method from `i18nProvider` under the hood.

## Usage

You can use the features of your own i18n library for translation in your own components.

```tsx 
import { useTranslate } from "@pankod/refine-core";

export const MyComponent = () => {
    const translate = useTranslate();

    return <button>{translate("my.translate.text")}</button>;
};
```

:::caution
This hook can only be used if `i18nProvider` is provided.
:::
