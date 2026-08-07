import React from "react";
import BlogLayout from "@theme/BlogLayout";
import Head from "@docusaurus/Head";
import { PageMetadata } from "@docusaurus/theme-common";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";

import { BreadcrumbJsonLd } from "@site/src/components/json-ld";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const AuthorPage = (props) => {
  const { items } = props;

  const author = items[0].content.metadata.authors[0];

  return (
    <>
      <BlogListPageMetadata author={author} />
      <BreadcrumbJsonLd
        items={[
          { label: "Blog", href: "/blog" },
          { label: "Authors", href: "/blog/authors" },
          {
            label: author?.name ?? "Author",
            href: author?.key ? `/blog/author/${author.key}` : undefined,
          },
        ]}
      />
      <AuthorProfileJsonLd author={author} />
      <BlogLayout showSidebarBanner={false} classNameContainer="!block">
        <div
          className={clsx(
            "w-full",
            "mx-auto",
            "not-prose",
            "pt-10",
            "blog-md:pt-20",
            "max-w-[320px]",
            "blog-md:max-w-[672px]",
            "blog-lg:max-w-[720px]",
            "blog-max:max-w-[1144px]",
            "blog-sm:px-0",
          )}
        >
          <AuthorBreadcrumbs />
          <AuthorProfile author={author} className={clsx("mt-4")} />
          {/* divider */}
          <div
            className={clsx(
              "border-b",
              "border-zinc-200",
              "dark:border-zinc-700",
              "mt-6",
              "mb-6",
              "blog-md:mt-12",
              "blog-md:mb-12",
            )}
          />
        </div>
        <BlogPostItems
          items={items}
          isAuthorPage={true}
          title="Posts"
          containerClassName={clsx(
            "!pt-0",
            "!pb-32",
            "!max-w-[320px]",
            "blog-md:!max-w-[672px]",
            "blog-lg:!max-w-[720px]",
            "blog-max:!max-w-[1144px]",
          )}
        />
      </BlogLayout>
    </>
  );
};

const AuthorBreadcrumbs = () => {
  return (
    <nav
      className={clsx(
        "not-prose",
        "flex",
        "items-center",
        "py-2",
        "gap-[6px]",
        "gap-6",
        "px-4",
        "blog-md:px-6",
      )}
      aria-label="Blog breadcrumbs"
    >
      <Link
        to="/blog"
        className={clsx(
          "no-underline",
          "hover:no-underline",
          "text-xs",
          "leading-4",
          "font-normal",
          "tracking-[-0.006em]",
          "text-zinc-500",
          "dark:text-zinc-400",
        )}
      >
        Blog
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        className={clsx("text-zinc-400", "dark:text-zinc-500")}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6 12 4-4-4-4"
        />
      </svg>
      <Link
        to="/blog/authors"
        className={clsx(
          "no-underline",
          "hover:no-underline",
          "text-xs",
          "leading-4",
          "font-normal",
          "tracking-[-0.006em]",
          "text-zinc-500",
          "dark:text-zinc-400",
        )}
      >
        Authors
      </Link>
    </nav>
  );
};

const BlogListPageMetadata = ({ author }) => {
  const authorName = author?.name ?? "Author";
  return (
    <>
      <PageMetadata
        title={`${authorName} - Blog Author`}
        description={`Posts by ${authorName} on the Refine Blog.`}
        image="https://refine.dev/img/og-blog.png"
      />
      <SearchMetadata tag="author_blog_posts_list" />
    </>
  );
};

const AuthorProfileJsonLd = ({ author }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      ...(author?.name && { name: author.name }),
      ...(author?.title && { jobTitle: author.title }),
      ...(author?.imageURL && { image: author.imageURL }),
      ...(author?.key && {
        url: `https://refine.dev/blog/author/${author.key}/`,
      }),
    },
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};

const AuthorProfile = ({ author, className }) => {
  const authorHref = author?.key ? `/blog/author/${author.key}` : undefined;

  return (
    <div
      className={clsx(
        "not-prose",
        "flex",
        "items-center",
        "gap-6",
        "px-4",
        "blog-md:px-6",
        className,
      )}
    >
      <Link to={authorHref} className={clsx("flex-shrink-0", "no-underline")}>
        <img
          src={author?.imageURL}
          alt={author?.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/img/generic-profile.png";
          }}
          className={clsx(
            "h-12",
            "w-12",
            "blog-md:h-[96px]",
            "blog-md:w-[96px]",
            "rounded-full",
            "object-cover",
            "bg-zinc-200",
            "dark:bg-zinc-800",
          )}
        />
      </Link>
      <div className={clsx("flex", "flex-col", "gap-2")}>
        <h1
          className={clsx(
            "m-0",
            "text-base",
            "blog-md:text-2xl",
            "font-semibold",
            "text-zinc-900",
            "dark:text-zinc-200",
          )}
        >
          {author?.name}
        </h1>
        <p
          className={clsx(
            "m-0",
            "text-xs",
            "blog-sm:text-sm",
            "text-zinc-600",
            "dark:text-zinc-400",
          )}
        >
          {author?.title}
        </p>
      </div>
    </div>
  );
};

export default AuthorPage;
