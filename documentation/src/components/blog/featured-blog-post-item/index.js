import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Date as DateComponent } from "@site/src/components/blog/common";
import clsx from "clsx";

export const FeaturedBlogPostItem = () => {
  const { metadata } = useBlogPost();
  const {
    permalink,
    title,
    date,
    formattedDate,
    frontMatter,
    description,
    category,
  } = metadata;
  const { label: categoryLabel, permalink: categoryPermalink } = category;

  return (
    <BlogPostItemContainer isFeatured>
      <Link
        itemProp="url"
        to={permalink}
        className={clsx(
          "block",
          "flex-shrink-0",
          "h-auto",
          "w-full",
          "blog-md:max-w-[320px]",
          "blog-lg:max-w-[428px]",
          "aspect-[320/178]",
          "blog-lg:aspect-[428/238]",
          "blog-max:aspect-[360/200]",
          "rounded-lg",
          "overflow-hidden",
        )}
      >
        <div className={clsx("not-prose relative m-0", "h-full w-full")}>
          <img
            src={`https://refine-web.imgix.net${frontMatter.image?.replace(
              "https://refine.ams3.cdn.digitaloceanspaces.com",
              "",
            )}?fm=webp&auto=format&h=668`}
            alt={title}
            className={clsx(
              "absolute inset-0 mt-0 h-full w-full rounded-[0.25rem] object-cover",
            )}
            loading="lazy"
          />
        </div>
      </Link>
      <div
        className={clsx(
          "pt-3",
          "blog-md:pt-4",
          "px-3",
          "blog-md:px-6",
          "blog-max:pb-6",
          "h-full",
        )}
      >
        <div
          className={clsx(
            "flex flex-wrap items-center",
            "mb-3",
            "blog-lg:mb-4",
            "gap-2",
            "text-zinc-500 dark:text-zinc-400",
            "text-[0.625rem]",
            "leading-4",
            "font-semibold",
            "tracking-[0.001em]",
          )}
        >
          <Link
            to={categoryPermalink}
            className={clsx(
              "uppercase",
              "no-underline",
              "hover:no-underline",
              "text-zinc-500",
              "dark:text-zinc-400",
              "hover:text-zinc-600",
              "dark:hover:text-zinc-300",
              "transition-colors",
              "duration-200",
              "ease-in-out",
            )}
          >
            {categoryLabel}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={6}
            viewBox="0 0 6 6"
            fill="none"
            className={clsx(
              "flex-shrink-0",
              "text-zinc-300 dark:text-zinc-600",
            )}
          >
            <circle cx={3} cy={3} r={3} fill="currentColor" />
          </svg>
          <DateComponent date={date} formattedDate={formattedDate} />
        </div>
        <div>
          <Link
            itemProp="url"
            to={permalink}
            className="no-underline hover:no-underline"
            rel="noopener dofollow"
          >
            <div
              className={clsx(
                "mb-3",
                "blog-lg:mb-4",
                "text-zinc-900 dark:text-white",
                "text-base",
                "font-medium",
                "text-balance",
                "tracking-[-0.004em]",
              )}
            >
              {title}
            </div>
          </Link>
          <div
            className={clsx(
              "line-clamp-3",
              "text-zinc-600 dark:text-zinc-400",
              "text-sm",
              "tracking-[-0.007em]",
              "mt-auto",
              "text-pretty",
            )}
          >
            {description}
          </div>
        </div>
      </div>
    </BlogPostItemContainer>
  );
};
