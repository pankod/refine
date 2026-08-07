import React from "react";
import clsx from "clsx";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import { BlogBreadcrumbs } from "../../refine-theme/blog-breadcrumbs";
import { BlogTOC } from "../../refine-theme/blog-toc";

import { BlogPostPageView, PostPaginator } from "../../components/blog";

function BlogPostPageContent({ children }) {
  const { metadata, toc } = useBlogPost();
  const { relatedPosts, permalink, title, category } = metadata;

  return (
    <BlogLayout toc={<BlogTOC toc={toc} />}>
      <BlogPostPageView>{children}</BlogPostPageView>
      <PostPaginator title="Related Articles" posts={relatedPosts} />
      <BlogBreadcrumbs
        permalink={permalink}
        title={title}
        category={category}
        className={clsx(
          "w-full",
          "mx-auto",
          "px-4",
          "blog-md:px-0",
          "blog-max:px-4",
          "max-w-[320px]",
          "blog-md:max-w-[672px]",
          "blog-lg:max-w-[720px]",
          "mt-10",
          "pb-16",
          "blog-md:pb-[120px]",
        )}
      />
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageContent>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
