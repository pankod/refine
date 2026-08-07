import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { ChevronRightIcon } from "@site/src/refine-theme/icons/chevron-right";
import { HomeIcon } from "@site/src/refine-theme/icons/home";
import { BreadcrumbJsonLd } from "@site/src/components/json-ld";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  listClassName?: string;
  showJsonLd?: boolean;
};

export const Breadcrumbs = ({
  items,
  className,
  listClassName,
  showJsonLd = true,
}: BreadcrumbsProps) => {
  if (!items.length) {
    return null;
  }

  const normalizedItems = items.map((item) => {
    if (item.label.toLowerCase() === "home") {
      return { ...item, href: "/core/" };
    }

    return item;
  });

  return (
    <nav
      className={clsx(
        "refine-breadcrumbs",
        "not-prose",
        "pb-4",
        "z-10",
        className,
      )}
      aria-label="Breadcrumbs"
    >
      {showJsonLd && <BreadcrumbJsonLd items={normalizedItems} />}
      <ul
        className={clsx(
          "breadcrumbs",
          "flex flex-wrap items-center",
          listClassName,
        )}
      >
        {normalizedItems.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0 && item.label.toLowerCase() === "home";

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex flex-row flex-nowrap items-center z-10"
            >
              {index > 0 && (
                <ChevronRightIcon className="text-zinc-300 dark:text-zinc-400" />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={clsx(
                    "text-zinc-500 dark:text-zinc-400",
                    "text-base",
                    "z-10",
                  )}
                >
                  {isHome ? (
                    <>
                      <HomeIcon className="text-zinc-500 dark:text-zinc-400" />
                      <span className="sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span
                  className={clsx(
                    isLast
                      ? "text-zinc-400 dark:text-zinc-300"
                      : "text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  {isHome ? (
                    <>
                      <HomeIcon className="text-zinc-500 dark:text-zinc-400" />
                      <span className="sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
