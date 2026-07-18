import { useTranslate, type UseTranslationProps } from "@refinedev/core";
import { useCallback, useEffect } from "react";

type Title = string | { i18nKey: string };

interface useDocumentTitleOptions {
  ns?: UseTranslationProps["ns"];

  defaultTitle?: string;
}

export const useDocumentTitle = (
  title?: Title,
  options?: useDocumentTitleOptions,
) => {
  const translate = useTranslate({ ns: options?.ns });

  const getTitle = useCallback(
    (title: Title) => {
      const key = typeof title === "string" ? title : title.i18nKey;

      return translate(key, options?.defaultTitle);
    },
    [translate, options?.defaultTitle],
  );

  useEffect(() => {
    if (!title) return;

    document.title = getTitle(title);
  }, [title, getTitle]);

  return (title: Title) => {
    document.title = getTitle(title);
  };
};
