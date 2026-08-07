import React from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import { BreadcrumbJsonLd } from "@site/src/components/json-ld";

// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const { selectMessage } = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          id: "theme.blog.post.plurals",
          description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One post|{count} posts",
        },
        { count },
      ),
    );
}

function useBlogTagsPostsPageTitle(tag) {
  const blogPostsPlural = useBlogPostsPlural();

  if (tag?.isAllTagsPage) {
    return translate(
      {
        id: "theme.blog.allTagsTitle",
        description: "The title of the page showing all tagged blog posts",
        message: "{nPosts} across all tags",
      },
      { nPosts: blogPostsPlural(tag.count) },
    );
  }

  return translate(
    {
      id: "theme.blog.tagTitle",
      description: "The title of the page for a blog tag",
      message: '{nPosts} tagged with "{tagName}"',
    },
    { nPosts: blogPostsPlural(tag.count), tagName: tag.label },
  );
}

function BlogTagsPostsPageMetadata({ tag }) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function useTagHeroTitle(tag) {
  if (!tag?.label) return undefined;
  const label = tag.label.charAt(0).toUpperCase() + tag.label.slice(1);
  return `Refine ${label} Blogs`;
}

function BlogTagsPostsPageContent({ tags, tag, items, sidebar, listMetadata }) {
  const isAllTagsPage = tag?.isAllTagsPage === true;
  const heroTitle = useTagHeroTitle(isAllTagsPage ? undefined : tag);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Tags", href: "/blog/tags" },
  ];

  if (!isAllTagsPage) {
    breadcrumbItems.push({ label: tag.label, href: tag.permalink });
  }

  return (
    <BlogLayout showHero heroTitle={heroTitle} sidebar={sidebar}>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <BlogPostItems items={items} tags={tags} isTagsPage={true} />
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
        <BlogListPaginator metadata={listMetadata} basePath={tag.permalink} />
      </div>
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}
    >
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
