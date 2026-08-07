import React from "react";
import {
  PageMetadata,
  useCurrentSidebarCategory,
} from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DocCardList from "@theme/DocCardList";
import DocPaginator from "@theme/DocPaginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import { DocVersionBadge } from "./doc-version-badge";
import { DocBreadcrumbs } from "./doc-breadcrumbs";
import { useDocsVersion } from "@docusaurus/theme-common/internal";
import clsx from "clsx";

function DocCategoryGeneratedIndexPageMetadata({ categoryGeneratedIndex }) {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      // TODO `require` this?
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({ categoryGeneratedIndex }) {
  const category = useCurrentSidebarCategory();
  const displayTitle = category?.label ?? categoryGeneratedIndex.title;
  const displayDescription = category?.description;
  const { label } = useDocsVersion();

  return (
    <>
      <div
        className={clsx(
          "flex flex-1 flex-col",
          "items-center justify-start",
          "px-4 sm:px-0 py-4 sm:py-14",
          "w-full",
        )}
      >
        <div className={clsx("max-w-screen-content w-full")}>
          <DocVersionBanner />
          <div className={clsx("flex flex-col", "mb-8")}>
            <DocBreadcrumbs />
            <div className="flex">
              <DocVersionBadge version={label} />
            </div>
          </div>
          <div className="refine-prose mb-16">
            <header>
              <h1>{displayTitle}</h1>
              {displayDescription && (
                <p
                  className="mb-8"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
                  dangerouslySetInnerHTML={{
                    __html: displayDescription,
                  }}
                />
              )}
            </header>
            <article
              className={clsx(
                "grid grid-cols-1 sm:grid-cols-2",
                "gap-2 sm:gap-4 2xl:gap-8",
                "not-prose",
              )}
            >
              <DocCardList items={category.items} />
            </article>
          </div>
        </div>
        <div className={clsx("max-w-screen-content", "w-full")}>
          <DocPaginator
            previous={categoryGeneratedIndex.navigation.previous}
            next={categoryGeneratedIndex.navigation.next}
          />
        </div>
      </div>
      <div
        className={clsx(
          "hidden xl:block",
          "w-full",
          "sticky right-0 top-[67px]",
          "max-w-[280px]",
          "overflow-auto",
          "h-[calc(100vh-67px)]",
          "pl-3",
          "pr-3",
          "py-12",
          "border-l dark:border-l-gray-700 border-l-gray-100",
          "invisible",
        )}
      />
    </>
  );
}

export const DocCategoryGeneratedIndexPage = (props) => {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
};
