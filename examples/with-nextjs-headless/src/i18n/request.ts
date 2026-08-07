"use server";

import { getUserLocale } from "@i18n";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../public/locales/${locale}/common.json`))
      .default,
  };
});
