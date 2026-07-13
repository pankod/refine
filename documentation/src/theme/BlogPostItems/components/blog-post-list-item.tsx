import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import clsx from "clsx";

import { Date as DateComponent } from "@site/src/components/blog/common";

export function BlogPostListItem() {
  const { metadata } = useBlogPost();
  const { permalink, title, date, formattedDate, category } = metadata;

  return (
    <article
      className={clsx(
        "w-full",
        "min-w-0",
        "border-b",
        "first:border-t",
        "border-zinc-200",
        "dark:border-zinc-800",
      )}
    >
      <Link
        to={permalink}
        className={clsx(
          "group",
          "w-full",
          "min-w-0",
          "grid",
          "items-start",
          "blog-lg:items-center",
          "grid-cols-1",
          "blog-lg:grid-cols-[minmax(0,1fr)_180px_120px]",
          "gap-2",
          "blog-lg:gap-6",
          "px-4",
          "blog-md:px-6",
          "py-5",
          "no-underline",
          "hover:no-underline",
          "hover:bg-white/50",
          "dark:hover:bg-[#09090B80]",
          "transition-colors",
          "duration-200",
          "ease-in-out",
        )}
      >
        <div
          className={clsx(
            "text-zinc-900",
            "dark:text-white",
            "text-base",
            "tracking-[-0.004em]",
            "text-balance",
            "min-w-0",
            "break-words",
            "group-hover:text-zinc-900",
            "dark:group-hover:text-white",
          )}
        >
          {title}
        </div>

        <div
          className={clsx("flex", "items-center", "gap-2", "blog-lg:contents")}
        >
          <div
            className={clsx(
              "uppercase",
              "text-[0.625rem]",
              "leading-4",
              "font-semibold",
              "tracking-[0.001em]",
              "text-zinc-500",
              "dark:text-zinc-400",
              "blog-lg:truncate",
              "group-hover:text-zinc-600",
              "dark:group-hover:text-zinc-300",
              "blog-lg:text-right",
            )}
          >
            {category.label}
          </div>
          <span
            className={clsx(
              "blog-lg:hidden",
              "w-1",
              "h-1",
              "rounded-full",
              "bg-zinc-500",
              "dark:bg-zinc-400",
              "flex-shrink-0",
            )}
          />
          <div
            className={clsx(
              "text-[0.625rem]",
              "leading-4",
              "font-semibold",
              "tracking-[0.001em]",
              "text-zinc-500",
              "dark:text-zinc-400",
              "uppercase",
              "group-hover:text-zinc-600",
              "dark:group-hover:text-zinc-300",
              "blog-lg:text-right",
            )}
          >
            <DateComponent date={date} formattedDate={formattedDate} />
          </div>
        </div>
      </Link>
    </article>
  );
}
