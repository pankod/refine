import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";

type CategoryItem = {
  value: string;
  name: string;
  permalink: string;
  count?: number;
};

type CategoryNavBarProps = {
  categories?: CategoryItem[];
  className?: string;
  allPath?: string;
  allLabel?: string;
};

export function CategoryNavBar({
  categories,
  className,
  allPath = "/blog",
  allLabel = "All posts",
}: CategoryNavBarProps) {
  return (
    <>
      <CategoryNavBarSelect
        categories={categories}
        allPath={allPath}
        allLabel={allLabel}
        className={clsx("max-w-[184px]", "blog-max:hidden", className)}
      />
      <CategoryNavBarDesktop
        categories={categories}
        allPath={allPath}
        allLabel={allLabel}
        className={clsx("hidden blog-max:block", className)}
      />
    </>
  );
}

function CategoryNavBarSelect({
  categories,
  className,
  allPath = "/blog",
  allLabel = "All posts",
}: CategoryNavBarProps) {
  const { pathname } = useLocation();
  const normalizedPathname = normalizePathname(pathname);
  const normalizedAllPath = normalizePathname(allPath);
  const isAllPostsActive = isAllPath(normalizedPathname, normalizedAllPath);
  const selectedCategoryPermalink = getActiveCategoryPermalink(
    pathname,
    categories,
    allPath,
  );
  const selectedCategory = (categories ?? []).find(
    (category) => category.permalink === selectedCategoryPermalink,
  );
  const selectedLabel = selectedCategory?.name ?? allLabel;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (dropdownRef.current?.contains(target)) return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "w-full",
        "border",
        "border-zinc-200",
        "dark:border-zinc-800",
        "rounded-2xl",
        "p-2",
        className,
      )}
    >
      <div
        ref={dropdownRef}
        className={clsx(
          "relative",
          "w-full",
          "rounded-lg",
          "bg-white",
          "dark:bg-zinc-950",
          "p-1",
        )}
      >
        <button
          type="button"
          className={clsx(
            "w-full",
            "flex",
            "items-center",
            "justify-between",
            "gap-2",
            "rounded-[0.25rem]",
            "py-2",
            "px-3",
            "tracking-[-0.006em]",
            "text-xs",
            "font-medium",
            "text-zinc-900",
            "dark:text-white",
          )}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Select blog category"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={clsx("truncate")}>{selectedLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            className={clsx(
              "flex-shrink-0",
              "text-zinc-500",
              "dark:text-zinc-400",
              "transition-transform",
              isOpen && "rotate-180",
            )}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={clsx(
              "absolute",
              "min-w-[180px]",
              "right-2",
              "top-[calc(100%+0.25rem)]",
              "z-20",
              "rounded-lg",
              "border",
              "border-zinc-200",
              "dark:border-zinc-800",
              "bg-white",
              "dark:bg-zinc-950",
              "p-1",
              "shadow-lg",
            )}
            role="listbox"
          >
            <Link
              to={allPath}
              className={clsx(
                "block",
                "no-underline hover:no-underline",
                "whitespace-nowrap",
                "rounded-[0.25rem]",
                "py-2",
                "px-3",
                "tracking-[-0.006em]",
                "text-xs",
                "font-medium",
                isAllPostsActive &&
                  "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
                isAllPostsActive && "hover:text-zinc-900 dark:hover:text-white",
                !isAllPostsActive && "text-zinc-500 dark:text-zinc-400",
                !isAllPostsActive &&
                  "hover:text-zinc-700 dark:hover:text-zinc-300",
                !isAllPostsActive &&
                  "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
                "transition-colors",
                "duration-200",
                "ease-in-out",
              )}
              onClick={() => setIsOpen(false)}
            >
              {allLabel}
            </Link>

            {(categories ?? []).map((category) => {
              const categoryPath = normalizePathname(category.permalink);
              const isActive =
                normalizedPathname === categoryPath ||
                normalizedPathname.startsWith(`${categoryPath}/page/`);

              return (
                <Link
                  key={category.permalink}
                  to={category.permalink}
                  className={clsx(
                    "block",
                    "no-underline hover:no-underline",
                    "whitespace-nowrap",
                    "rounded-[0.25rem]",
                    "py-2",
                    "px-3",
                    "tracking-[-0.006em]",
                    "text-xs",
                    "font-medium",
                    isActive &&
                      "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
                    isActive && "hover:text-zinc-900 dark:hover:text-white",
                    !isActive && "text-zinc-500 dark:text-zinc-400",
                    !isActive && "hover:text-zinc-700 dark:hover:text-zinc-300",
                    !isActive &&
                      "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
                    "transition-colors",
                    "duration-200",
                    "ease-in-out",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryNavBarDesktop({
  categories,
  className,
  allPath = "/blog",
  allLabel = "All posts",
}: CategoryNavBarProps) {
  const { pathname } = useLocation();
  const normalizedPathname = normalizePathname(pathname);
  const normalizedAllPath = normalizePathname(allPath);
  const isAllPostsActive = isAllPath(normalizedPathname, normalizedAllPath);

  return (
    <div
      className={clsx(
        "border",
        "border-zinc-200",
        "dark:border-zinc-800",
        "rounded-2xl",
        "p-2",
        className,
      )}
    >
      <div
        className={clsx(
          "w-full",
          "rounded-lg",
          "bg-white",
          "dark:bg-zinc-950",
          "p-1",
        )}
      >
        <div className={clsx("flex", "flex-wrap", "items-center", "gap-1")}>
          <Link
            to={allPath}
            className={clsx(
              "no-underline hover:no-underline",
              "rounded-[0.25rem]",
              "py-2",
              "px-3",
              "tracking-[-0.006em]",
              "text-xs",
              "font-medium",
              isAllPostsActive &&
                "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
              isAllPostsActive && "hover:text-zinc-900 dark:hover:text-white",
              !isAllPostsActive && "text-zinc-500 dark:text-zinc-400",
              !isAllPostsActive &&
                "hover:text-zinc-700 dark:hover:text-zinc-300",
              !isAllPostsActive &&
                "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
              "transition-colors",
              "duration-200",
              "ease-in-out",
            )}
          >
            {allLabel}
          </Link>
          {(categories ?? []).map((category) => {
            const categoryPath = normalizePathname(category.permalink);
            const isActive =
              normalizedPathname === categoryPath ||
              normalizedPathname.startsWith(`${categoryPath}/page/`);

            return (
              <Link
                key={category.permalink}
                to={category.permalink}
                className={clsx(
                  "no-underline hover:no-underline",
                  "rounded-[0.25rem]",
                  "py-2",
                  "px-3",
                  "tracking-[-0.006em]",
                  "text-xs",
                  "font-medium",
                  isActive &&
                    "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
                  isActive && "hover:text-zinc-900 dark:hover:text-white",
                  !isActive && "text-zinc-500 dark:text-zinc-400",
                  !isActive && "hover:text-zinc-700 dark:hover:text-zinc-300",
                  !isActive && "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
                  "transition-colors",
                  "duration-200",
                  "ease-in-out",
                )}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const normalizePathname = (pathname = "") => {
  const normalized = pathname.replace(/\/+$/, "");

  return normalized || "/";
};

const isAllPath = (normalizedPathname: string, normalizedAllPath: string) =>
  normalizedPathname === normalizedAllPath ||
  normalizedPathname.startsWith(`${normalizedAllPath}/page/`);

const getActiveCategoryPermalink = (
  pathname: string,
  categories?: CategoryItem[],
  allPath = "/blog",
) => {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedAllPath = normalizePathname(allPath);

  if (isAllPath(normalizedPathname, normalizedAllPath)) return allPath;

  const activeCategory = (categories ?? []).find((category) => {
    const categoryPath = normalizePathname(category.permalink);

    return (
      normalizedPathname === categoryPath ||
      normalizedPathname.startsWith(`${categoryPath}/page/`)
    );
  });

  return activeCategory?.permalink ?? allPath;
};
