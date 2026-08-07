import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

import { DarkModeIcon } from "./icons/dark-mode";
import { BlogSearch } from "./blog-search";
import { LightModeIcon } from "./icons/light-mode";
import { RefineLogoSingleIcon } from "./icons/refine-logo-single";

type BlogHeaderProps = {
  trackProgress?: boolean;
};

const BlogThemeToggle = () => {
  const { colorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <button
      type="button"
      onClick={() => setColorMode(isDarkMode ? "light" : "dark")}
      className={clsx(
        "box-border",
        "flex",
        "h-10",
        "w-10",
        "flex-row",
        "items-center",
        "justify-center",
        "gap-0.5",
        "rounded-lg",
        "border",
        "p-2.5",
        "border-zinc-200",
        "bg-transparent",
        "dark:border-zinc-700",
        "text-zinc-400",
        "transition-colors",
      )}
      aria-label="Toggle color mode"
    >
      {isDarkMode ? (
        <LightModeIcon className={clsx("h-5 w-5 shrink-0")} />
      ) : (
        <DarkModeIcon className={clsx("h-5 w-5 shrink-0")} />
      )}
    </button>
  );
};

export const BlogHeader = React.memo(function BlogHeaderComponent({
  trackProgress = false,
}: BlogHeaderProps) {
  const { scrollYProgress } = useScroll();
  const progressPercentage = useTransform(
    scrollYProgress,
    [0.03, 0.95],
    ["0%", "100%"],
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-20",
        "h-16",
        "border-b border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-900",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex h-full w-full items-center justify-between",
          "w-full",
          "max-w-[328px]",
          "blog-md:max-w-[672px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
        )}
      >
        <Link
          to="/blog"
          className={clsx(
            "flex items-center gap-2",
            "no-underline hover:no-underline",
            "blog-max:-ml-1",
          )}
        >
          <RefineLogoSingleIcon
            className={clsx("h-6 w-6 text-zinc-900 dark:text-white")}
          />
          <span
            className={clsx(
              "text-base font-semibold leading-6 tracking-[-0.004em]",
              "text-zinc-900 dark:text-white",
            )}
          >
            Refine
          </span>
          <span
            className={clsx(
              "text-2xl font-thin leading-6",
              "text-zinc-300 dark:text-zinc-600",
            )}
          >
            /
          </span>
          <span
            className={clsx(
              "text-base font-normal leading-6 tracking-[-0.004em]",
              "text-zinc-700 dark:text-zinc-300",
            )}
          >
            Blog
          </span>
        </Link>

        <div className={clsx("flex items-center gap-4")}>
          <BlogSearch />
          <BlogThemeToggle />
        </div>
      </div>

      {trackProgress && (
        <div
          className={clsx("h-px", "w-full", "bg-zinc-200", "dark:bg-zinc-800")}
        >
          {/* @ts-expect-error - framer-motion type issue */}
          <motion.div
            // @ts-expect-error - framer-motion type issue
            className={clsx("h-full", "bg-teal-600", "dark:bg-teal-300")}
            style={{ width: progressPercentage }}
          />
        </div>
      )}
    </header>
  );
});
