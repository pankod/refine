import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import { Breadcrumbs } from "@site/src/components/breadcrumbs";

export default function BlogCategoriesListPage({ categories, sidebar }) {
  const title = "Categories";
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Categories", href: "/blog/categories" },
  ];

  const sortedCategories = [...(categories ?? [])].sort((a, b) => {
    const countA = typeof a?.count === "number" ? a.count : 0;
    const countB = typeof b?.count === "number" ? b.count : 0;

    if (countA !== countB) return countB - countA;

    const nameA = `${a?.name ?? a?.value ?? ""}`.toLowerCase();
    const nameB = `${b?.name ?? b?.value ?? ""}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}
    >
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_categories_list" />
      <BlogLayout sidebar={sidebar}>
        <div
          className={clsx(
            "w-full",
            "mx-auto",
            "blog-sm:max-w-[592px]",
            "blog-md:max-w-[704px]",
            "blog-lg:max-w-[896px]",
            "blog-max:max-w-[1200px]",
            "px-6 blog-sm:px-0",
            "pt-6 pb-12",
            "not-prose",
          )}
        >
          <Breadcrumbs items={breadcrumbItems} />
          <div className={clsx("mt-6", "flex", "flex-col", "gap-3")}>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Blog Categories
            </span>
            <h1 className="text-3xl blog-sm:text-4xl font-semibold text-zinc-900 dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[640px]">
              Browse posts by category.
            </p>
          </div>

          {sortedCategories.length > 0 ? (
            <div
              className={clsx(
                "mt-8",
                "grid gap-3",
                "blog-sm:grid-cols-2 blog-lg:grid-cols-3 blog-max:grid-cols-4",
              )}
            >
              {sortedCategories.map((category) => {
                const name = category?.name ?? category?.value ?? "Category";
                const count =
                  typeof category?.count === "number" ? category.count : 0;

                return (
                  <Link
                    key={category.permalink}
                    href={category.permalink}
                    className={clsx(
                      "group",
                      "relative",
                      "flex",
                      "flex-col",
                      "gap-2",
                      "rounded-2xl",
                      "border",
                      "px-4 py-3",
                      "transition-all duration-200 ease-in-out",
                      "hover:-translate-y-0.5",
                      "border-zinc-200/70 dark:border-zinc-700/70",
                      "bg-white/70 dark:bg-zinc-900/40",
                      "hover:border-zinc-300 dark:hover:border-zinc-600",
                      "no-underline hover:no-underline",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {name}
                      </span>
                      <span
                        className={clsx(
                          "rounded-full",
                          "px-2 py-0.5",
                          "text-[11px] font-medium",
                          "bg-zinc-100/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
                        )}
                      >
                        {count} {count === 1 ? "post" : "posts"}
                      </span>
                    </div>
                    <div
                      className={clsx(
                        "h-px w-full",
                        "bg-gradient-to-r",
                        "from-zinc-200/80 via-zinc-200/30 to-transparent",
                        "dark:from-zinc-700/80 dark:via-zinc-700/30",
                      )}
                    />
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      View posts
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
              No categories found.
            </p>
          )}
        </div>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
