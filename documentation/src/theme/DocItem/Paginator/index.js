import React from "react";
import { useDoc } from "@docusaurus/theme-common/internal";
import DocPaginator from "@theme/DocPaginator";

import { useCurrentTutorial } from "../../../hooks/use-current-tutorial";

/**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */

export default function DocItemPaginator() {
  const { metadata } = useDoc();
  const tutorialData = useCurrentTutorial();

  const isTutorial = !!tutorialData;

  const previous = isTutorial
    ? tutorialData.pagination.previous
    : metadata.previous;
  const next = isTutorial ? tutorialData.pagination.next : metadata.next;

  return <DocPaginator previous={previous} next={next} />;
}
