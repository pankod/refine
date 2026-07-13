import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";

import { Github, TwitterIcon, LinkedinIcon } from "../icons";

export const AuthorCardWithProps = ({ author, className }) => {
  return <AuthorCard author={author} className={className} />;
};

const AuthorCard = ({ author }) => {
  const authorHasSocialInfo =
    author.github || author.twitter || author.linkedin;

  return (
    <div
      className={clsx(
        "px-4",
        "blog-md:px-7",
        "blog-2xl:px-0",
        "max-w-[640px]",
        "blog-md:max-w-screen-blog-md",
        "blog-2xl:max-w-screen-blog-md",
        "w-full",
        "mx-auto",
      )}
    >
      <div className={clsx("flex", "justify-between", "items-center")}>
        <div
          className={clsx(
            "w-full",
            "flex items-center justify-between flex-wrap",
          )}
        >
          <div className={clsx("flex items-center", "gap-2 sm:gap-6")}>
            <Link
              to={`/blog/author/${author?.key}`}
              itemProp="url"
              className="flex-shrink-0"
            >
              <img
                src={author?.imageURL}
                alt={author?.name}
                loading="lazy"
                className={clsx(
                  "flex flex-shrink-0",
                  "h-12 w-12",
                  "blog-sm:h-[88px] blog-sm:w-[88px]",
                  "blog-md:h-[120px] blog-md:w-[120px]",
                  "rounded-full object-cover",
                )}
              />
            </Link>
            <div className={clsx("not-prose flex flex-col justify-between")}>
              <h1
                className={clsx(
                  "text-xl sm:text-[40px] sm:leading-[56px]",
                  "m-0 p-0 pb-2 font-bold text-gray-900 dark:text-gray-200",
                )}
              >
                {author?.name}
              </h1>
              <div
                className={clsx(
                  "text-xs sm:text-base",
                  "text-gray-600 dark:text-gray-400",
                )}
              >
                {author?.title}
              </div>
            </div>
          </div>

          {authorHasSocialInfo && (
            <div className="flex justify-center gap-3">
              {author?.github && (
                <Link to={author?.github}>
                  <Github className="h-6 w-6" />
                </Link>
              )}
              {author?.twitter && (
                <Link to={author?.twitter}>
                  <TwitterIcon className="h-6 w-6" />
                </Link>
              )}
              {author?.linkedin && (
                <Link to={author?.linkedin}>
                  <LinkedinIcon className="h-6 w-6" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8" />
    </div>
  );
};
