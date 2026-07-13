import { useTranslate } from "@refinedev/core";
import { useEffect } from "react";

type Title = string | { i18nKey: string };

export const useDocumentTitle = (title?: Title) => {
  const translate = useTranslate();

  useEffect(() => {
    if (!title) return;

    if (typeof title === "string") {
      document.title = translate(title);
    } else {
      document.title = translate(title.i18nKey);
    }
  }, [title]);

  return (title: Title) => {
    if (typeof title === "string") {
      document.title = translate(title);
    } else {
      document.title = translate(title.i18nKey);
    }
  };
};
