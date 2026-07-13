import { useCallback, useContext } from "react";

import { I18nContext } from "@contexts/i18n";

/**
 * If you need to change the locale at runtime, refine provides the `useSetLocale` hook.
 * It returns the changeLocale method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/translate/useSetLocale} for more details.
 */
export const useSetLocale = () => {
  const { i18nProvider } = useContext(I18nContext);

  return useCallback((lang: string) => i18nProvider?.changeLocale(lang), []);
};
