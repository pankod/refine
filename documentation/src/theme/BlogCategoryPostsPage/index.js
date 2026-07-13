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

function BlogCategoryPostsPageMetadata(props) {
  const { listMetadata, category } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();

  const categoryName = category.name ?? category.value ?? "Category";
  const isPaginated =
    typeof listMetadata.page === "number" && listMetadata.page > 1;

  const baseTitle = category.seoTitle ?? `${categoryName} - ${siteTitle}`;
  const baseDescription =
    category.seoDescription ?? listMetadata.blogDescription;

  const title = isPaginated
    ? `${baseTitle} - Page ${listMetadata.page}`
    : baseTitle;
  const description = isPaginated
    ? `${baseDescription} - Page ${listMetadata.page}`
    : baseDescription;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
      </Head>
      <PageMetadata
        description={description}
        image="https://refine.dev/img/og-blog.png"
      />
      <SearchMetadata tag="blog_category_posts" />
    </>
  );
}

function BlogCategoryPostsPageContent(props) {
  const {
    category,
    categories,
    items,
    listMetadata,
    featuredPosts = [],
  } = props;

  const categoryName = category.name ?? category.value ?? "Category";

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: categoryName, href: category.permalink },
  ];

  return (
    <BlogLayout showHero>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {featuredPosts.length > 0 && (
        <FeaturedBlogPostItems items={featuredPosts} />
      )}
      <BlogPostItems items={items} categories={categories} />
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
        <BlogListPaginator
          metadata={listMetadata}
          basePath={category.permalink}
        />
      </div>
    </BlogLayout>
  );
}

export default function BlogCategoryPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogCategoryPostsPageMetadata {...props} />
      <BlogCategoryPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
