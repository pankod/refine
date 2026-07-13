import React from "react";
import Link from "@docusaurus/Link";

import { Date } from "@site/src/components/blog/common";
import clsx from "clsx";

export const PostPaginator = ({ posts, title }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        "w-full",
        "mx-auto",
        "px-4",
        "blog-md:px-0",
        "blog-max:px-4",
        "max-w-[320px]",
        "blog-md:max-w-[672px]",
        "blog-lg:max-w-[720px]",
        "pt-16",
        "blog-md:pt-[72px]",
      )}
    >
      <div className={clsx("w-full")}>
        <h2
          className={clsx(
            "m-0",
            "mb-4",
            "p-0",
            "text-2xl",
            "font-semibold",
            "text-zinc-900",
            "dark:text-white",
          )}
        >
          {title}
        </h2>
        <div className={clsx("flex", "flex-col", "not-prose")}>
          {posts.map((post, index) => {
            const isFirstItem = index === 0;

            return (
              <React.Fragment key={post.permalink ?? post.id}>
                {isFirstItem && <PostDivider />}
                <Link
                  to={post.permalink}
                  rel="dofollow"
                  className={clsx(
                    "group",
                    "blog-content-bleed",
                    "flex",
                    "flex-col",
                    "blog-md:flex-row",
                    "w-full",
                    "items-start",
                    "blog-md:items-start",
                    "gap-2",
                    "py-3",
                    "blog-md:py-4",
                    "px-3",
                    "blog-md:px-4",
                    "no-underline",
                    "hover:no-underline",
                    "transition-colors",
                    "duration-200",
                    "hover:bg-white/50",
                    "dark:hover:bg-[#09090B80]",
                  )}
                >
                  <div
                    className={clsx(
                      "flex-1",
                      "min-w-0",
                      "text-base",
                      "leading-6",
                      "font-medium",
                      "tracking-[-0.004em]",
                      "text-zinc-700",
                      "dark:text-zinc-300",
                      "transition-colors",
                      "duration-200",
                      "group-hover:text-zinc-900",
                      "dark:group-hover:text-white",
                    )}
                  >
                    {post.title}
                  </div>

                  <div
                    className={clsx(
                      "w-[120px]",
                      "blog-md:text-right",
                      "text-[10px]",
                      "leading-6",
                      "font-semibold",
                      "uppercase",
                      "tracking-[0.01em]",
                      "text-zinc-500",
                      "dark:text-zinc-400",
                      "transition-colors",
                      "duration-200",
                      "group-hover:text-zinc-700",
                      "dark:group-hover:text-zinc-300",
                      "shrink-0",
                    )}
                  >
                    <Date date={post.date} formattedDate={post.formattedDate} />
                  </div>
                </Link>
                <PostDivider />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PostDivider = () => (
  <div
    className={clsx(
      "blog-content-bleed",
      "h-px",
      "bg-zinc-200",
      "dark:bg-zinc-800",
    )}
  />
);
