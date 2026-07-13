import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";

import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import BlogListPaginator from "@theme/BlogListPaginator";
import { BreadcrumbJsonLd } from "@site/src/components/json-ld";

import { FeaturedBlogPostItems } from "../../components/blog";

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, page, permalink } = metadata;
  const isBlogOnlyMode = permalink === "/";
  const baseTitle = isBlogOnlyMode ? siteTitle : blogTitle;
  const isPaginated = typeof page === "number" && page > 1;
  const title = isPaginated ? `${baseTitle} - Page ${page}` : baseTitle;
  const description = isPaginated
    ? `${blogDescription} - Page ${page}`
    : blogDescription;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="https://refine.dev/img/og-blog.png"
        />
        <meta
          name="twitter:image"
          content="https://refine.dev/img/og-blog.png"
        />
      </Head>
      <PageMetadata description={description} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props) {
  const { metadata, categories, items, featuredPosts = [] } = props;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  if (featuredPosts.length > 3) {
    throw new Error(
      `Only 3 featured posts are allowed (you have: ${featuredPosts.length}). Please check your blog posts and set is_featured to true for at most 3 posts.`,
    );
  }

  const paginatedPosts = items.filter(
    (post) => post.content.metadata.frontMatter.is_featured !== true,
  );

  return (
    <BlogLayout showHero>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {featuredPosts.length > 0 && (
        <FeaturedBlogPostItems items={featuredPosts} />
      )}
      <BlogPostItems items={paginatedPosts} categories={categories} />
      <div
        className={clsx(
          "w-full",
          "mx-auto",
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[704px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "mb-12",
        )}
      >
        <BlogListPaginator metadata={metadata} />
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
