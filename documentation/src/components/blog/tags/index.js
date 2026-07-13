import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import clsx from "clsx";

export const Tags = () => {
  const { metadata } = useBlogPost();

  return (
    <div className="flex flex-wrap gap-2">
      {metadata.tags.map((tag) => {
        const shouldUppercase = tag.label.length <= 3;
        const isRefineTag =
          tag.label.toLowerCase() === "refine" ||
          tag.label.toLowerCase() === "refine-core" ||
          tag.label.toLowerCase() === "refine core";

        return (
          <Link
            to={tag.permalink}
            className={clsx(
              shouldUppercase && "uppercase",
              isRefineTag && "capitalize",
              "no-underline hover:no-underline",
              "text-xs",
              "font-medium",
              "rounded-sm",
              "py-1",
              "px-1.5",
              "text-zinc-900 dark:text-white",
              "bg-zinc-200 dark:bg-zinc-700",
              "tracking-[-0.006em]",
              "whitespace-nowrap",
            )}
            key={tag.permalink}
          >
            {tag.label}
          </Link>
        );
      })}
    </div>
  );
};
