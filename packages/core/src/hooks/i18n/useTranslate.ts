import { useContext, useMemo } from "react";

import { I18nContext } from "@contexts/i18n";
import type { UseTranslationProps } from "./useTranslation";

/**
 * If you need to translate the texts in your own components, refine provides the `useTranslate` hook.
 * It returns the translate method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/translate/useTranslate} for more details.
 */
export const useTranslate = ({ ns }: UseTranslationProps = {}) => {
  const { i18nProvider } = useContext(I18nContext);

  const fn = useMemo(() => {
    function translate(
      key: string,
      options?: any,
      defaultMessage?: string,
    ): string;
    function translate(key: string, defaultMessage?: string): string;

    function translate(
      key: string,
      _options?: string | any,
      _defaultMessage?: string,
    ) {
      let options = _options;
      let defaultMessage = _defaultMessage;

      if (typeof options === "string" && defaultMessage === undefined) {
        defaultMessage = options;

        if (ns) {
          options = { ns };
        } else {
          options = undefined;
        }
      }

      if (ns && options && typeof options !== "string") {
        options = { ns, ...options };
      }

      return (
        i18nProvider?.translate(key, options, defaultMessage) ??
        defaultMessage ??
        (typeof _options === "string" && typeof _defaultMessage === "undefined"
          ? _options
          : key)
      );
    }

    return translate;
  }, [i18nProvider]);

  return fn;
};
