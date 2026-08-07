import React from "react";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import clsx from "clsx";

export default function BlogPostItemContainer({
  children,
  className,
  isFeatured = false,
}) {
  const { frontMatter, assets } = useBlogPost();
  const { withBaseUrl } = useBaseUrlUtils();
  const image = assets.image ?? frontMatter.image;

  return (
    <article
      className={clsx(
        "flex",
        "p-4",
        isFeatured && "flex-col blog-md:flex-row blog-max:flex-col",
        !isFeatured && "flex-col",
        "rounded-3xl",
        "hover:bg-white",
        "dark:hover:bg-[#09090B80]",
        "transition-colors",
        "duration-200",
        "ease-in-out",
        className,
      )}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      {image && (
        <meta
          itemProp="image"
          content={withBaseUrl(image, { absolute: true })}
        />
      )}
      {children}
    </article>
  );
}
