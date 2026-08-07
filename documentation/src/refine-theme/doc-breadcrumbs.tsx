import Link from "@docusaurus/Link";
import { useSidebarBreadcrumbs } from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import clsx from "clsx";
import React, { useMemo } from "react";
import {
  BreadcrumbJsonLd,
  type BreadcrumbItem,
} from "@site/src/components/json-ld";
import { useTWBreakpoints } from "../hooks/use-tw-breakpoints";
import { ChevronRightIcon } from "./icons/chevron-right";
import { HomeIcon } from "./icons/home";

const hiddenBreadcrumbText = "...";

export const DocBreadcrumbs = () => {
  const breakpoints = useTWBreakpoints();
  const breadcrumbs = useSidebarBreadcrumbs();

  if (!breadcrumbs) {
    return null;
  }

  const breadcrumbItems = useMemo(() => {
    const baseItems: BreadcrumbItem[] = [
      { label: "Home", href: "/core/" },
      { label: "Docs", href: "/core/docs/" },
    ];

    const sidebarItems: BreadcrumbItem[] = (breadcrumbs as any[]).map(
      (item) => ({
        label: item.label,
        href: item.href,
      }),
    );

    return [...baseItems, ...sidebarItems];
  }, [breadcrumbs]);

  const [breadcrumbList, renderDots] = useMemo(() => {
    const shouldRenderDotdotdot = breadcrumbItems.length > 4 && !breakpoints.sm;

    return [
      breadcrumbItems.map((item, index, array) => ({
        ...item,
        hideOnMobile:
          shouldRenderDotdotdot && index > 1 && index < array.length - 2,
      })),
      shouldRenderDotdotdot,
    ];
  }, [breadcrumbItems, breakpoints.sm]);

  const lastVisibleIndex = useMemo(() => {
    for (let i = breadcrumbList.length - 1; i >= 0; i -= 1) {
      if (!breadcrumbList[i].hideOnMobile) {
        return i;
      }
    }
    return breadcrumbList.length - 1;
  }, [breadcrumbList]);

  return (
    <nav
      className={clsx("refine-breadcrumbs", "pb-6")}
      aria-label={translate({
        id: "theme.docs.breadcrumbs.navAriaLabel",
        message: "Breadcrumbs",
        description: "The ARIA label for the breadcrumbs",
      })}
    >
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {breadcrumbList.find((item) => item.label === "Examples") && (
        <div
          className={clsx(
            "example-full-title",
            "hidden",
            "h-0 w-0",
            "overflow-hidden",
          )}
          aria-hidden={true}
        >
          {breadcrumbList
            .slice(2)
            .map((item) => item.label)
            .join(" ")}
          {" Example"}
        </div>
      )}
      <ul className={clsx("breadcrumbs", "flex flex-wrap items-center")}>
        {breadcrumbList.map((item, idx) => {
          const isLast = idx === lastVisibleIndex;
          const isHome = idx === 0 && item.label.toLowerCase() === "home";

          return (
            <React.Fragment key={idx}>
              <li
                className={clsx(
                  "flex-row flex-nowrap",
                  item.hideOnMobile ? "hidden" : "flex",
                )}
              >
                {idx > 0 && (
                  <ChevronRightIcon className="text-zinc-300 dark:text-zinc-400" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={clsx(
                      "text-zinc-500 dark:text-zinc-400",
                      "text-base",
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
              {idx === 1 && breadcrumbList.length > 2 && renderDots ? (
                <li className={clsx("flex flex-row flex-nowrap")}>
                  <ChevronRightIcon className="text-zinc-300 dark:text-zinc-400" />
                  <div className="text-zinc-500 dark:text-zinc-400">
                    {hiddenBreadcrumbText}
                  </div>
                </li>
              ) : null}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
