import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import TagsListInline from "@theme/TagsListInline";

function TagsRow(props) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "row margin-bottom--sm",
      )}
    >
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}) {
  return (
    <div
      className={clsx(
        "flex items-start justify-between content-md:items-center",
        "flex-col content-md:flex-row",
        "gap-4",
      )}
    >
      <div className={clsx()}>
        <a
          href={editUrl}
          target="_blank"
          rel="noopener"
          className={clsx(
            "text-refine-link-light dark:text-refine-link-dark",
            "text-xs content-4xl:text-sm",
            "underline",
          )}
        >
          Edit this page
        </a>
      </div>
      <div
        className={clsx(
          "text-gray-500",
          "text-xs leading-4 content-4xl:text-base content-4xl:leading-6",
        )}
      >
        <span>Last updated on </span>
        <span>{formattedLastUpdatedAt} </span>
        <span>by {lastUpdatedBy}</span>
      </div>
    </div>
  );
}

export const DocFooter = () => {
  const { metadata } = useDoc();
  const {
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    tags,
  } = metadata;

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer className={clsx("flex", "flex-col", "gap-6", "mt-16", "mb-6")}>
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
    </footer>
  );
};
