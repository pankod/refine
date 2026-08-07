import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";
import clsx from "clsx";

export const FeaturedBlogPostItems = ({ items }) => {
  return (
    <div className={clsx("w-full")}>
      <div
        className={clsx(
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[704px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "w-full",
          "mx-auto",
          "px-4 blog-sm:px-0",
          "py-4 blog-md:py-8",
          "not-prose",
        )}
      >
        <div className={clsx("grid grid-cols-1 blog-max:grid-cols-3")}>
          {items.map(({ content: BlogPostContent }) => (
            <BlogPostProvider
              key={BlogPostContent.metadata.permalink}
              content={BlogPostContent}
            >
              <FeaturedBlogPostItem />
            </BlogPostProvider>
          ))}
        </div>
      </div>
    </div>
  );
};
