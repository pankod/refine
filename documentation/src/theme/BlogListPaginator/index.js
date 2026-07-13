import React from "react";
import { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

import { ChevronLeft, ChevronRight } from "../../components/blog/icons";
import { usePagination, DOTS } from "../../hooks/use-pagination";
import clsx from "clsx";

export default function BlogListPaginator(props) {
  const { metadata, basePath = "/blog" } = props;
  const { totalPages, page: currentPage } = metadata;

  const paginationRange = usePagination({ totalPages, currentPage });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav
      className={clsx(
        "blog-md:justify-end",
        "flex items-center justify-center",
        "not-prose",
      )}
      aria-label={translate({
        id: "theme.blog.paginator.navAriaLabel",
        message: "Blog list page navigation",
        description: "The ARIA label for the blog pagination",
      })}
    >
      <div
        className={clsx(
          "my-6",
          "inline-flex",
          "flex-col",
          "items-start",
          "rounded-2xl",
          "border",
          "border-zinc-200",
          "dark:border-zinc-800",
          "bg-zinc-100",
          "dark:bg-zinc-900",
          "p-2",
        )}
      >
        <ul
          className={clsx(
            "m-0",
            "flex",
            "list-none",
            "items-center",
            "gap-1",
            "rounded-lg",
            "bg-white",
            "dark:bg-zinc-950",
            "p-1",
          )}
        >
          <li>
            <Link
              to={
                currentPage === 1
                  ? undefined
                  : currentPage - 1 === 1
                    ? basePath
                    : `${basePath}/page/${currentPage - 1}`
              }
              className={clsx(
                "flex h-8 w-8 items-center justify-center",
                "rounded",
                "no-underline hover:no-underline",
                "text-zinc-500 dark:text-zinc-400",
                "hover:text-zinc-900 dark:hover:text-zinc-300",
                "transition-colors",
                currentPage === 1 && "pointer-events-none opacity-30",
              )}
            >
              <ChevronLeft width={16} height={16} />
            </Link>
          </li>

          {paginationRange.map((pageNumber, index) => {
            let key = `page:${pageNumber}`;
            if (typeof pageNumber === "string") {
              key += `:${index}`;
            }
            if (pageNumber === DOTS) {
              return (
                <li
                  key={key}
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center",
                    "text-xs font-medium leading-4 tracking-[-0.006em]",
                    "text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  &#8230;
                </li>
              );
            }

            return (
              <li key={pageNumber}>
                <Link
                  to={
                    pageNumber === 1
                      ? basePath
                      : `${basePath}/page/${pageNumber}`
                  }
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center",
                    "rounded",
                    "text-xs font-medium leading-4 tracking-[-0.006em]",
                    "no-underline hover:no-underline",
                    "transition-colors",
                    pageNumber === currentPage &&
                      "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white",
                    pageNumber !== currentPage &&
                      "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
                  )}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              to={
                currentPage === lastPage
                  ? undefined
                  : `${basePath}/page/${currentPage + 1}`
              }
              className={clsx(
                "flex h-8 w-8 items-center justify-center",
                "rounded",
                "no-underline hover:no-underline",
                "text-zinc-500 dark:text-zinc-400",
                "hover:text-zinc-900 dark:hover:text-zinc-300",
                "transition-colors",
                currentPage === lastPage && "pointer-events-none opacity-30",
              )}
            >
              <ChevronRight width={16} height={16} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
