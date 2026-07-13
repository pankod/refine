import { useGetLocale } from "./useGetLocale";
import { useSetLocale } from "./useSetLocale";
import { useTranslate } from "./useTranslate";

/**
 * It combines `useTranslate`, `useSetLocale` and `useGetLocale` hooks for a better developer experience.
 * It returns `i18nProvider` methods under the hood.
 * @returns `translate` method to translate the texts.
 * @returns `changeLocale` method to change the locale
 * @returns `getLocale` method to get the current locale.
 *
 * @see {@link https://refine.dev/docs/i18n/i18n-provider/} for more details.
 */
export const useTranslation = () => {
  const translate = useTranslate();
  const changeLocale = useSetLocale();
  const getLocale = useGetLocale();

  return {
    translate,
    changeLocale,
    getLocale,
  };
};
