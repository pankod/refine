import { useTranslate, type UseTranslationProps } from "@refinedev/core";
import { useCallback, useEffect } from "react";

type Title = string | { i18nKey: string };

interface useDocumentTitleOptions {
  ns?: UseTranslationProps["ns"];

  /**
   * Passed to defaultMessage for translate from useTranslate
   */
  defaultTitle?: string;
}

export const useDocumentTitle = (
  title?: Title,
  options?: useDocumentTitleOptions,
) => {
  const translate = useTranslate({ ns: options?.ns });

  const getTitleCB = (title: Title) => {
    const key = typeof title === "string" ? title : title.i18nKey;

    return translate(key, options?.defaultTitle);
  };
  const getTitle = useCallback(getTitleCB, [translate, options?.defaultTitle]);

  useEffect(() => {
    if (!title) return;

    document.title = getTitle(title);
  }, [title, getTitle]);

  return (title: Title) => {
    document.title = getTitle(title);
  };
};
