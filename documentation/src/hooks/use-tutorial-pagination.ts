import React from "react";
import { useDocsVersion } from "@docusaurus/theme-common/internal";
import { useTutorialUIPackage } from "./use-tutorial-ui-package";

type Props = {
  frontMatter: { tutorial: { prev?: string; next?: string } };
};

export default function useTutorialPagination({ frontMatter }: Props) {
  const { docs } = useDocsVersion();

  const { current: currentUI } = useTutorialUIPackage();

  const parsePagination = (rawId: string) => {
    if (!rawId.includes("{preferredUI}") && !currentUI) {
      return undefined;
    }

    const id = rawId.replace("{preferredUI}", currentUI);

    return id;
  };

  const toPermalink = (id: string) => {
    return `/docs/${id}`;
  };

  const { tutorial } = frontMatter;

  const { next: nextRaw, prev: prevRaw } = tutorial ?? {};

  const next = nextRaw ? parsePagination(nextRaw) : undefined;
  const prev = prevRaw ? parsePagination(prevRaw) : undefined;

  const prevDocItem = docs[prev];
  const nextDocItem = docs[next];

  const previousPage = prevDocItem
    ? {
        ...prevDocItem,
        permalink: toPermalink(prevDocItem.id),
      }
    : undefined;

  const nextPage = nextDocItem
    ? {
        ...nextDocItem,
        permalink: toPermalink(nextDocItem.id),
      }
    : undefined;

  return {
    previous: previousPage,
    next: nextPage,
  };
}
