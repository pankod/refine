import React, { useEffect, useState } from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";
import BlogPostItem from "@theme/BlogPostItem";
import clsx from "clsx";
import { CategoryNavBar } from "@site/src/components/blog";
import { BlogPostViewModeToggle } from "./components/blog-post-view-mode-toggle";
import { BlogPostListItem } from "./components/blog-post-list-item";

const BLOG_POST_VIEW_MODE_STORAGE_KEY = "blog-post-view-mode";

export default function BlogPostItems({
  items,
  categories,
  tags,
  isAuthorPage,
  isTagsPage,
  title,
  className,
  containerClassName,
}) {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window === "undefined") return "grid";

    try {
      const persistedViewMode = window.localStorage.getItem(
        BLOG_POST_VIEW_MODE_STORAGE_KEY,
      );

      return persistedViewMode === "list" ? "list" : "grid";
    } catch {
      return "grid";
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(BLOG_POST_VIEW_MODE_STORAGE_KEY, viewMode);
    } catch {
      // ignore storage errors
    }
  }, [viewMode]);

  const tagItems = (tags ?? [])
    .filter(
      (tag) =>
        typeof tag?.label === "string" && typeof tag?.permalink === "string",
    )
    .map((tag) => ({
      value: tag.label,
      name: tag.label,
      permalink: tag.permalink,
      count: tag.count,
    }));

  return (
    <div className={clsx("w-full", className)}>
      <div
        className={clsx(
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[704px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1144px]",
          "px-2",
          "blog-sm:px-0",
          "w-full",
          "pt-4",
          "pb-6",
          "mx-auto",
          "not-prose",
          containerClassName,
        )}
      >
        <div
          className={clsx(
            viewMode === "grid" && "mb-6",
            viewMode === "list" && "mb-8",
            "w-full",
            "flex",
            "items-center",
            "gap-3",
            "not-prose",
          )}
        >
          {!isAuthorPage && tagItems.length > 0 ? (
            <CategoryNavBar
              categories={tagItems}
              allPath="/blog/tags"
              allLabel="All tags"
            />
          ) : (
            !isAuthorPage &&
            !isTagsPage && <CategoryNavBar categories={categories} />
          )}
          {title && (
            <h2
              className={clsx(
                "pl-4",
                "blog-md:pl-6",
                "m-0",
                "text-2xl",
                "blog-md:text-[2rem]",
                "blog-md:leading-[2.5rem]",
                "font-semibold",
                "text-zinc-900",
                "dark:text-white",
              )}
            >
              {title}
            </h2>
          )}
          <BlogPostViewModeToggle viewMode={viewMode} onChange={setViewMode} />
        </div>

        {viewMode === "grid" ? (
          <div
            className={clsx(
              "w-full",
              "blog-content-bleed",
              "mx-auto",
              "grid grid-cols-1 blog-md:grid-cols-2 blog-max:grid-cols-3",
            )}
          >
            {items.map(({ content: BlogPostContent }) => (
              <BlogPostProvider
                key={BlogPostContent.metadata.permalink}
                content={BlogPostContent}
              >
                <BlogPostItem>
                  <BlogPostContent />
                </BlogPostItem>
              </BlogPostProvider>
            ))}
          </div>
        ) : (
          <div className={clsx("w-full")}>
            {items.map(({ content: BlogPostContent }) => (
              <BlogPostProvider
                key={BlogPostContent.metadata.permalink}
                content={BlogPostContent}
              >
                <BlogPostListItem />
              </BlogPostProvider>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
