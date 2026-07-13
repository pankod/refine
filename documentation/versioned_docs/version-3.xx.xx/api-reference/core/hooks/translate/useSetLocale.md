If you need to change the locale at runtime, refine provides the `useSetLocale` hook, It returns the changeLocale method from `i18nProvider` under the hood.

## Usage

You can use the features of your own i18n library to change the locale in your own components.

```tsx 
import { useSetLocale } from "@pankod/refine-core";

export const LanguageSwicher = () => {
    const changeLanguage = useSetLocale();

    return (
        <div>
            <span>Languages</span>
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("es")}>Spanish</button>
        </div>
    );
};
```

:::caution
This hook can only be used if `i18nProvider` is provided.
:::
