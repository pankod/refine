import React from "react";
import { PageMetadata } from "@docusaurus/theme-common";
import { useBlogPost } from "@docusaurus/theme-common/internal";

export default function BlogPostPageMetadata() {
  const { assets, metadata } = useBlogPost();
  const {
    title,
    description,
    date,
    tags,
    authors,
    frontMatter,
    category,
    lastUpdate,
  } = metadata;
  const { keywords } = frontMatter;
  const categoryLabel = category?.label ?? frontMatter.category;
  const articleTags = tags.map((tag) => tag.label).join(",");

  const image = frontMatter.social_image ?? assets.image ?? frontMatter.image;

  return (
    <PageMetadata
      title={title}
      description={description}
      keywords={keywords}
      image={image}
    >
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={date} />
      {lastUpdate && (
        <meta property="article:modified_time" content={lastUpdate} />
      )}
      {/* TODO double check those article meta array syntaxes, see https://ogp.me/#array */}
      {authors.some((author) => author.url) && (
        <meta
          property="article:author"
          content={authors
            .map((author) => author.url)
            .filter(Boolean)
            .join(",")}
        />
      )}
      {categoryLabel && (
        <meta property="article:section" content={categoryLabel} />
      )}
      {articleTags.length > 0 && (
        <meta property="article:tag" content={articleTags} />
      )}
    </PageMetadata>
  );
}
