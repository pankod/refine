import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import { blogPostContainerID } from "@docusaurus/utils-common";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "@theme/MDXComponents";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import {
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";

import {
  BreadcrumbJsonLd,
  BlogPostingJsonLd,
} from "@site/src/components/json-ld";
import { Date, ReadingTime } from "@site/src/components/blog/common";
import { BannerBlog } from "@site/src/components/banner/banner-blog";
import { ArrowLeft, LinkedinIcon, RedditIcon, TwitterIcon } from "../icons";
import { CalendarArrowUpIcon } from "@site/src/refine-theme/icons/calendar";

export const BlogPostPageView = ({ children }) => {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { withBaseUrl } = useBaseUrlUtils();
  const {
    siteConfig: { url: siteUrl },
  } = useDocusaurusContext();

  const {
    permalink,
    title,
    date,
    formattedDate,
    formattedLastUpdateDate,
    lastUpdate,
    readingTime,
    category,
    frontMatter,
    tags,
    description,
    authors,
  } = metadata;

  const image = frontMatter?.image;
  const absoluteImage = image
    ? withBaseUrl(image, { absolute: true })
    : undefined;
  const shareUrl = `${siteUrl}${permalink}`;
  const breadcrumbItems = getBreadcrumbItems({ permalink, title, category });
  const isUpdated = formattedDate !== formattedLastUpdateDate;

  return (
    <article
      className={clsx(
        "w-full",
        "px-3",
        "blog-md:px-0",
        "max-w-[320px]",
        "blog-md:max-w-[672px]",
        "blog-lg:max-w-[720px]",
      )}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      {absoluteImage && <meta itemProp="image" content={absoluteImage} />}
      <meta itemProp="datePublished" content={date} />
      <meta itemProp="dateModified" content={lastUpdate} />

      <BreadcrumbJsonLd items={breadcrumbItems} />

      <BlogPostingJsonLd
        title={title}
        description={description}
        date={date}
        lastUpdate={lastUpdate}
        image={absoluteImage}
        url={shareUrl}
        authors={authors}
      />

      <div className={clsx()}>
        <PostHeader
          isBlogPostPage={isBlogPostPage}
          title={title}
          permalink={permalink}
          date={date}
          formattedDate={formattedDate}
          readingTime={readingTime}
          category={category}
          tags={tags}
          authors={authors ?? []}
          shareUrl={shareUrl}
          description={description}
          siteUrl={siteUrl}
        />
      </div>

      <CoverImage
        image={image}
        title={title}
        className={clsx("mt-8", "not-prose", "blog-lg:mt-12")}
      />

      {isUpdated && (
        <div
          className={clsx(
            "mt-4",
            "blog-lg:mt-6",
            "flex",
            "items-center",
            "gap-2",
            "text-xs",
            "tracking-[-0.006em]",
            "p-2",
            "rounded-lg",
            "mx-0",
            "blog-lg:mx-4",
            "bg-zinc-100",
            "dark:bg-zinc-800",
            "text-zinc-500",
            "dark:text-zinc-400",
          )}
        >
          <CalendarArrowUpIcon />
          <div>
            Last updated at{" "}
            <Date
              date={lastUpdate}
              formattedDate={formattedLastUpdateDate.toLowerCase()}
              itemProp="dateModified"
              className="capitalize"
            />
          </div>
        </div>
      )}

      <div className={clsx("mt-8", "blog-lg:mt-10")}>
        <PostBody>{children}</PostBody>
      </div>
    </article>
  );
};

const getBreadcrumbItems = ({ permalink, title, category }) => {
  return [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(category?.label && category?.permalink
      ? [{ label: category.label, href: category.permalink }]
      : []),
    { label: title, href: permalink },
  ];
};

const getHashtags = (tags = []) => {
  return tags
    .map((tag) => tag?.label)
    .filter((label) => typeof label === "string" && label.length > 0);
};

const getImgixUrl = (image) => {
  if (!image) {
    return null;
  }

  return `https://refine-web.imgix.net${image.replace(
    "https://refine.ams3.cdn.digitaloceanspaces.com",
    "",
  )}?fm=webp&auto=format&w=1788`;
};

const ShareButtonContainer = ({ children, tone = "twitter" }) => {
  return (
    <div
      className={clsx(
        "flex",
        "h-8",
        "w-8",
        "items-center",
        "justify-center",
        "p-2",
        "rounded-[4px]",
        "transition-colors",
        "duration-200",
        tone === "twitter" && "bg-[#27272A]",
        tone === "twitter" && "hover:bg-[#3F3F46]",
        tone === "reddit" && "bg-[rgba(255,69,0,0.2)]",
        tone === "reddit" && "hover:bg-[rgba(255,69,0,0.28)]",
        tone === "linkedin" && "bg-[rgba(0,127,177,0.2)]",
        tone === "linkedin" && "hover:bg-[rgba(0,127,177,0.28)]",
      )}
    >
      {children}
    </div>
  );
};

const ShareActions = ({ shareUrl, title, tags, description, siteUrl }) => {
  const hashtags = getHashtags(tags);

  return (
    <div className={clsx("items-center", "gap-2", "not-prose", "flex")}>
      <span
        className={clsx(
          "mr-1",
          "text-[0.625rem]",
          "leading-4",
          "font-semibold",
          "uppercase",
          "tracking-[-0.01em]",
          "text-zinc-500",
          "dark:text-zinc-400",
        )}
      >
        Share on:
      </span>

      <div
        className={clsx(
          "flex",
          "h-8",
          "w-[112px]",
          "items-center",
          "gap-2",
          "p-0",
        )}
      >
        <TwitterShareButton
          windowWidth={750}
          windowHeight={800}
          url={shareUrl}
          className={clsx("flex")}
          title={title}
          hashtags={hashtags}
        >
          <ShareButtonContainer tone="twitter">
            <TwitterIcon className={clsx("h-4", "w-4", "text-white")} />
          </ShareButtonContainer>
        </TwitterShareButton>

        <RedditShareButton
          windowWidth={750}
          windowHeight={600}
          url={shareUrl}
          className={clsx("flex")}
          title={title}
        >
          <ShareButtonContainer tone="reddit">
            <RedditIcon className={clsx("h-4", "w-4")} />
          </ShareButtonContainer>
        </RedditShareButton>

        <LinkedinShareButton
          url={shareUrl}
          title={title}
          source={siteUrl}
          summary={description}
          className={clsx("flex")}
        >
          <ShareButtonContainer tone="linkedin">
            <LinkedinIcon className={clsx("h-4", "w-4")} />
          </ShareButtonContainer>
        </LinkedinShareButton>
      </div>
    </div>
  );
};

const CoverImage = ({ image, title, className }) => {
  const coverUrl = getImgixUrl(image);

  if (!coverUrl) {
    return null;
  }

  return (
    <div className={clsx(className, "blog-content-bleed")}>
      <img
        className={clsx(
          "aspect-[720/400]",
          "max-w-[720px]",
          "w-full",
          "h-auto",
          "mx-auto",
          "rounded-2xl",
        )}
        src={coverUrl}
        alt={title}
      />
    </div>
  );
};

const PostHeader = ({
  isBlogPostPage,
  title,
  permalink,
  date,
  formattedDate,
  readingTime,
  category,
  tags,
  authors,
  shareUrl,
  description,
  siteUrl,
}) => {
  return (
    <div
      className={clsx("not-prose", "pt-8", "blog-lg:pt-16", "blog-max:px-4")}
    >
      <div
        className={clsx(
          "flex",
          "flex-wrap",
          "items-center",
          "justify-between",
          "gap-4",
        )}
      >
        <BackToAllPosts />
        <PostDateAndReading
          date={date}
          formattedDate={formattedDate}
          readingTime={readingTime}
        />
      </div>

      <div className={clsx("mt-6", "blog-lg:mt-8")}>
        <PostTitle
          isBlogPostPage={isBlogPostPage}
          title={title}
          permalink={permalink}
        />
      </div>

      <div
        className={clsx(
          "mt-4",
          "flex",
          "flex-wrap",
          "flex-col",
          "blog-md:flex-row",
          "items-start",
          "blog-md:items-center",
          "blog-md:justify-between",
          "gap-4",
        )}
      >
        <PostCategoryAndTags
          category={category}
          tags={tags}
          authors={authors}
        />
        <ShareActions
          shareUrl={shareUrl}
          title={title}
          tags={tags}
          description={description}
          siteUrl={siteUrl}
        />
      </div>
    </div>
  );
};

const BackToAllPosts = () => {
  return (
    <Link
      to="/blog"
      className={clsx(
        "inline-flex",
        "items-center",
        "gap-1.5",
        "text-[0.625rem]",
        "leading-4",
        "font-semibold",
        "uppercase",
        "tracking-[-0.01em]",
        "text-zinc-500",
        "dark:text-zinc-400",
        "no-underline",
        "hover:no-underline",
        "transition-colors",
        "duration-200",
        "ease-in-out",
        "hover:text-zinc-900",
        "dark:hover:text-white",
        "blog-max:-ml-[20px]",
      )}
    >
      <ArrowLeft className={clsx("h-4", "w-4")} />
      <span>All posts</span>
    </Link>
  );
};

const PostDateAndReading = ({ date, formattedDate, readingTime }) => {
  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "gap-2",
        "text-[0.625rem]",
        "leading-4",
        "font-semibold",
        "uppercase",
        "tracking-[-0.01em]",
        "text-zinc-500",
        "dark:text-zinc-400",
      )}
    >
      <Date date={date} formattedDate={formattedDate} />
      {typeof readingTime !== "undefined" && (
        <>
          <span
            className={clsx(
              "h-1.5",
              "w-1.5",
              "rounded-full",
              "bg-zinc-300",
              "dark:bg-zinc-600",
            )}
          />
          <ReadingTime readingTime={readingTime} />
        </>
      )}
    </div>
  );
};

const PostCategoryAndTags = ({ category, tags = [], authors = [] }) => {
  const { label: categoryLabel, permalink: categoryLink } = category;
  const author = authors[0];

  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "gap-2",
        "text-[0.625rem]",
        "leading-4",
        "font-semibold",
        "uppercase",
        "tracking-[-0.01em]",
        "text-zinc-500",
        "dark:text-zinc-400",
      )}
    >
      <Link
        to={categoryLink}
        className={clsx(
          "text-zinc-500",
          "dark:text-zinc-400",
          "no-underline",
          "hover:no-underline",
          "transition-colors",
          "duration-200",
          "ease-in-out",
          "hover:text-zinc-900",
          "dark:hover:text-white",
        )}
      >
        {categoryLabel}
      </Link>
      {author && (
        <>
          <span
            className={clsx(
              "h-1.5",
              "w-1.5",
              "rounded-full",
              "bg-zinc-300",
              "dark:bg-zinc-600",
            )}
          />
          <Link
            to={`/blog/author/${author.key}/`}
            className={clsx(
              "text-zinc-500",
              "dark:text-zinc-400",
              "no-underline",
              "hover:no-underline",
              "transition-colors",
              "duration-200",
              "ease-in-out",
              "hover:text-zinc-900",
              "dark:hover:text-white",
            )}
          >
            {author.name}
          </Link>
        </>
      )}

      {/* {tags.map((tag, index) => {
        const label = typeof tag === "string" ? tag : tag?.label;
        const permalink =
          typeof tag === "object" && tag !== null ? tag.permalink : undefined;

        if (!label) return null;

        return (
          <React.Fragment key={permalink ?? `${label}-${index}`}>
            <span
              className={clsx(
                "h-1.5",
                "w-1.5",
                "rounded-full",
                "bg-zinc-300",
                "dark:bg-zinc-600",
              )}
            />
            {permalink ? (
              <Link
                to={permalink}
                className={clsx(
                  "text-zinc-500",
                  "dark:text-zinc-400",
                  "no-underline",
                  "hover:no-underline",
                  "transition-colors",
                  "duration-200",
                  "ease-in-out",
                  "hover:text-zinc-900",
                  "dark:hover:text-white",
                )}
              >
                {label}
              </Link>
            ) : (
              <span>{label}</span>
            )}
          </React.Fragment>
        );
      })} */}
    </div>
  );
};

const PostTitle = ({ isBlogPostPage, title, permalink }) => {
  return (
    <h1
      className={clsx(
        "text-[2rem]",
        "leading-[2.5rem]",
        "blog-lg:text-[2.5rem]",
        "blog-lg:leading-[3rem]",
        "font-semibold",
        "text-zinc-900",
        "dark:text-white",
        "tracking-[0.0005em]",
      )}
      itemProp="headline"
    >
      {isBlogPostPage ? (
        title
      ) : (
        <Link itemProp="url" to={permalink}>
          {title}
        </Link>
      )}
    </h1>
  );
};

const PostBody = ({ children }) => {
  let firstH2Rendered = false;
  const H2Component = MDXComponents.h2 ?? "h2";

  const components = {
    ...MDXComponents,
    h2: ({ children: headingChildren, ...props }) => {
      const heading = <H2Component {...props}>{headingChildren}</H2Component>;

      if (firstH2Rendered) {
        return heading;
      }

      firstH2Rendered = true;

      return (
        <>
          <div
            className={clsx(
              "not-prose",
              "my-6",
              "blog-md:my-12",
              "blog-content-bleed",
            )}
          >
            <BannerBlog />
          </div>
          {heading}
        </>
      );
    },
  };

  return (
    <div
      id={blogPostContainerID}
      className={clsx("markdown", "blog-max:px-4")}
      itemProp="articleBody"
    >
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
};
