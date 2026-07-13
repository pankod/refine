import { I18nProvider } from "@refinedev/core";

/**
 * Check out the I18n Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/i18n-provider/
 **/
export const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => {
    console.log("translate", {
      key,
      options,
      defaultMessage,
    });

    // TODO: do the translation

    return defaultMessage || "";
  },

  changeLocale: (lang: string, options?: any) => {
    console.log("changeLocale", {
      lang,
      options,
    });

    // TODO: change the locale

    return Promise.resolve();
  },
  getLocale: () => {
    console.log("getLocale");

    // TODO: get the locale

    return "en";
  },
};
