import type { useTranslate } from "../../../hooks/i18n";

export const safeTranslate = (
  translate: ReturnType<typeof useTranslate>,
  key: string,
  defaultMessage?: string,
  options?: any,
) => {
  const translated = options
    ? translate(key, options, defaultMessage)
    : translate(key, defaultMessage);

  const fallback = defaultMessage ?? key;

  if (translated === key || typeof translated === "undefined") {
    return fallback;
  }

  return translated;
};
