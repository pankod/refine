import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

type BlogCategory = {
  label?: string;
  permalink?: string;
} | null;

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BlogBreadcrumbsProps = {
  permalink?: string;
  title?: string;
  category?: BlogCategory;
  className?: string;
};

const getBreadcrumbItems = ({
  permalink,
  title,
  category,
}: {
  permalink: string;
  title: string;
  category?: BlogCategory;
}): BreadcrumbItem[] => [
  { label: "Blog", href: "/blog" },
  ...(category?.label && category?.permalink
    ? [{ label: category.label, href: category.permalink }]
    : []),
  { label: title, href: permalink },
];

export const BlogBreadcrumbs = ({
  permalink,
  title,
  category,
  className,
}: BlogBreadcrumbsProps) => {
  if (!title || !permalink) {
    return null;
  }

  const items = getBreadcrumbItems({ permalink, title, category });

  return (
    <nav
      className={clsx("not-prose", "w-full", "min-w-0", className)}
      aria-label="Blog breadcrumbs"
    >
      <ol
        className={clsx(
          "m-0",
          "p-0",
          "list-none",
          "flex",
          "w-full",
          "min-w-0",
          "flex-col",
          "items-start",
          "gap-1",
          "blog-sm:flex-row",
          "blog-sm:flex-wrap",
          "blog-sm:items-center",
          "blog-sm:gap-0",
          "text-sm",
          "leading-5",
          "font-normal",
          "tracking-[-0.007em]",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemTextClass = isLast
            ? "text-zinc-400 dark:text-zinc-400"
            : "text-zinc-700 dark:text-zinc-300";
          const itemContainerClass = isLast
            ? "blog-sm:flex-1"
            : "blog-sm:w-auto blog-sm:shrink-0";
          const itemLabelClass = clsx(
            "block",
            "min-w-0",
            "max-w-full",
            "break-words",
            isLast ? "blog-sm:truncate" : "blog-sm:whitespace-nowrap",
          );

          return (
            <li
              key={`${item.label}-${item.href ?? "current"}`}
              className={clsx(
                "flex",
                "items-center",
                "min-w-0",
                "max-w-full",
                "w-full",
                itemContainerClass,
              )}
            >
              {index > 0 && (
                <span
                  className={clsx(
                    "hidden",
                    "blog-sm:inline",
                    "blog-sm:mx-2",
                    "text-zinc-300",
                    "dark:text-zinc-700",
                  )}
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={clsx(
                    "no-underline",
                    "hover:no-underline",
                    itemLabelClass,
                    itemTextClass,
                    "hover:text-zinc-700",
                    "dark:hover:text-zinc-300",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(itemLabelClass, itemTextClass)}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              <span
                className={clsx(
                  "ml-2",
                  "text-zinc-300",
                  "dark:text-zinc-700",
                  "blog-sm:hidden",
                )}
                aria-hidden="true"
              >
                /
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
