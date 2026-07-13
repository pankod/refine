import React, { Fragment } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from "@docusaurus/theme-common";
// @ts-expect-error - No types available for BlogLayout and SearchMetadata in Docusaurus theme
import BlogLayout from "@theme/BlogLayout";
// @ts-expect-error - No types available for BlogLayout and SearchMetadata in Docusaurus theme
import SearchMetadata from "@theme/SearchMetadata";

import { Date as DateComponent } from "@site/src/components/blog/common";
import { BreadcrumbJsonLd } from "@site/src/components/json-ld";

type BlogAuthor = {
  key?: string;
  name?: string;
  title?: string;
  imageURL?: string;
};

type BlogAuthorPostCategory = {
  label?: string;
};

type BlogAuthorPost = {
  title?: string;
  permalink: string;
  date?: string;
  formattedDate?: string;
  category?: BlogAuthorPostCategory;
};

type BlogAuthorEntry = {
  author?: BlogAuthor;
  permalink: string;
  recentPosts?: BlogAuthorPost[];
};

type AuthorsListPageProps = {
  authors?: BlogAuthorEntry[];
};

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const AuthorsListPageMetadata = () => {
  return (
    <>
      <PageMetadata
        title="Authors"
        description="Browse Refine Blog authors and their latest posts."
        image="https://refine.dev/img/og-blog.png"
      />
      <SearchMetadata tag="blog_authors_list" />
    </>
  );
};

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div
      className={clsx(
        "w-full",
        "mx-auto",
        "not-prose",
        "max-w-[320px]",
        "blog-md:max-w-[672px]",
        "blog-lg:max-w-[720px]",
        "blog-max:max-w-[1144px]",
        "blog-sm:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

const AuthorsPageHeader = () => {
  return (
    <PageContainer className={clsx("pt-20")}>
      <Link
        to="/blog"
        className={clsx(
          "inline-flex",
          "px-3",
          "blog-md:px-6",
          "text-base",
          "leading-6",
          "tracking-[-0.01em]",
          "text-zinc-500",
          "dark:text-zinc-400",
          "hover:text-zinc-700",
          "dark:hover:text-zinc-300",
          "no-underline",
          "hover:no-underline",
        )}
      >
        Blog
      </Link>
      <h1
        className={clsx(
          "m-0",
          "mt-6",
          "px-3",
          "blog-md:px-6",
          "font-semibold",
          "text-[2rem]",
          "leading-[3rem]",
          "blog-md:text-[2.5rem]",
          "blog-md:leading-[3rem]",
          "text-zinc-900",
          "dark:text-white",
        )}
      >
        Authors
      </h1>
    </PageContainer>
  );
};

const PostMetaText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "font-semibold",
        "text-[0.625rem]",
        "leading-5",
        "blog-md:leading-6",
        "tracking-[0.01em]",
        "uppercase",
        "text-zinc-500",
        "dark:text-zinc-400",
        className,
      )}
    >
      {children}
    </div>
  );
};

const AuthorPostsPreview = ({ posts = [] }: { posts?: BlogAuthorPost[] }) => {
  if (!posts.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        "w-full",
        "border-t",
        "border-neutral-200",
        "dark:border-zinc-800",
      )}
    >
      {posts.map((post) => (
        <Link
          key={post.permalink}
          to={post.permalink}
          className={clsx(
            "group",
            "grid",
            "grid-cols-1",
            "blog-max:grid-cols-[minmax(0,1fr)_164px_122px]",
            "gap-x-6",
            "gap-y-3",
            "px-3",
            "blog-md:px-6",
            "py-4",
            "blog-md:py-6",
            "border-b",
            "border-neutral-200",
            "dark:border-zinc-800",
            "no-underline",
            "hover:no-underline",
            "transition-colors",
            "duration-200",
            "ease-in-out",
            "hover:bg-white/50",
            "dark:hover:bg-zinc-950/50",
            "not-prose",
          )}
        >
          <div
            className={clsx(
              "min-w-0",
              "text-sm",
              "blog-md:text-base",
              "leading-6",
              "tracking-[-0.004em]",
              "text-zinc-700",
              "dark:text-zinc-100",
              "group-hover:text-zinc-900",
              "dark:group-hover:text-white",
              "text-balance",
            )}
          >
            {post.title}

            <div
              className={clsx(
                "flex",
                "items-center",
                "gap-2",
                "blog-max:hidden",
              )}
            >
              {post.category?.label && (
                <PostMetaText>{post.category.label}</PostMetaText>
              )}
              {post.category?.label && post.date && (
                <span className={clsx("text-zinc-400", "dark:text-zinc-500")}>
                  •
                </span>
              )}
              {post.date && post.formattedDate && (
                <PostMetaText>
                  <DateComponent
                    date={post.date}
                    formattedDate={post.formattedDate}
                  />
                </PostMetaText>
              )}
            </div>
          </div>

          <PostMetaText
            className={clsx("hidden", "blog-max:block", "text-right")}
          >
            {post.category?.label}
          </PostMetaText>

          <PostMetaText
            className={clsx("hidden", "blog-max:block", "text-right")}
          >
            <DateComponent
              date={post.date}
              formattedDate={post.formattedDate}
            />
          </PostMetaText>
        </Link>
      ))}
    </div>
  );
};

const AuthorProfileLink = ({
  author,
  permalink,
}: {
  author?: BlogAuthor;
  permalink: string;
}) => {
  return (
    <Link
      to={permalink}
      className={clsx(
        "not-prose",
        "inline-flex",
        "items-center",
        "blog-max:flex-col",
        "blog-max:items-start",
        "gap-3",
        "blog-md:gap-6",
        "pl-3",
        "blog-md:pl-6",
        "py-4",
        "blog-md:py-0",
        "blog-md:pb-6",
        "no-underline",
        "hover:no-underline",
      )}
    >
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
          "blog-md:h-[60px]",
          "blog-md:w-[60px]",
          "blog-max:h-[96px]",
          "blog-max:w-[96px]",
          "rounded-full",
          "object-cover",
          "bg-zinc-200",
          "dark:bg-zinc-800",
        )}
      />

      <div className={clsx("flex", "flex-col", "gap-2")}>
        <h2
          className={clsx(
            "m-0",
            "font-semibold",
            "!text-base",
            "blog-md:!text-2xl",
            "text-zinc-900",
            "dark:text-white",
          )}
        >
          {author?.name}
        </h2>
        <p
          className={clsx(
            "m-0",
            "!text-xs",
            "blog-md:!text-sm",
            "tracking-[-0.007em]",
            "text-zinc-500",
            "dark:text-zinc-400",
          )}
        >
          {author?.title}
        </p>
      </div>
    </Link>
  );
};

const AuthorListSection = ({ entry }: { entry: BlogAuthorEntry }) => {
  const { author, permalink, recentPosts = [] } = entry;

  return (
    <section>
      <div
        className={clsx(
          "grid",
          "grid-cols-1",
          "blog-max:grid-cols-[280px_minmax(0,1fr)]",
          "blog-max:gap-16",
        )}
      >
        <div className={clsx("min-w-0")}>
          <AuthorProfileLink author={author} permalink={permalink} />
        </div>

        <div className={clsx("min-w-0")}>
          <AuthorPostsPreview posts={recentPosts} />
          <Link
            to={permalink}
            className={clsx(
              "inline-flex",
              "px-3",
              "blog-md:px-6",
              "py-4",
              "blog-md:py-6",
              "text-sm",
              "tracking-[-0.007em]",
              "hover:text-teal-500",
              "text-teal-600",
              "dark:text-teal-400",
              "no-underline",
              "hover:no-underline",
            )}
          >
            See all posts by{" "}
            {`${author?.name ?? ""}`.trim().split(/\s+/)[0] || author?.name}
          </Link>
        </div>
      </div>
    </section>
  );
};

const AuthorsListPageContent = ({ authors = [] }: AuthorsListPageProps) => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Authors", href: "/blog/authors" },
  ];

  return (
    <BlogLayout classNameContainer={clsx("block")}>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <AuthorsPageHeader />
      <PageContainer className={clsx("pb-32")}>
        {authors.length > 0 ? (
          <>
            {authors.map((entry) => (
              <Fragment key={entry.author?.key ?? entry.permalink}>
                {/* Divider between authors */}
                <div
                  className={clsx(
                    "my-6",
                    "blog-md:my-8",
                    "blog-lg:my-12",
                    "border-t",
                    "border-zinc-300",
                    "dark:border-zinc-700",
                  )}
                />
                <AuthorListSection entry={entry} />
              </Fragment>
            ))}
          </>
        ) : (
          <div
            className={clsx(
              "py-10",
              "border-t",
              "border-zinc-200",
              "dark:border-zinc-700",
              "text-zinc-500",
              "dark:text-zinc-400",
            )}
          >
            No authors found.
          </div>
        )}
      </PageContainer>
    </BlogLayout>
  );
};

export default function AuthorsListPage(props: AuthorsListPageProps) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
        "blog-authors-list-page",
      )}
    >
      <AuthorsListPageMetadata />
      <AuthorsListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
