import SearchBar from "../theme/SearchBar";
import clsx from "clsx";
import React, { useState } from "react";
import { CommonGithubStarButton } from "./common-github-star-button";
import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { CommonThemeToggle } from "./common-theme-toggle";
import { DocSearchButton } from "./doc-search-button";
import { DocSidebarModal } from "./doc-sidebar-modal";
import { DocVersionDropdown } from "./doc-version-dropdown";
import { TopAnnouncement } from "./top-announcement";
import { DocRefineLogo } from "./doc-refine-logo";

export const HEADER_HEIGHT = 65;

export const DocHeader = () => {
  return (
    <>
      <TopAnnouncement />
      <div
        className={clsx(
          "flex items-center",
          "h-16",
          "z-10",
          "sticky",
          "top-0",
          "py-4 sm:py-3 px-4 sm:px-6",
          "bg-zinc-50 dark:bg-[#202023]",
        )}
      >
        <Desktop />
        <Mobile />
      </div>
    </>
  );
};

const Desktop = () => {
  return (
    <div className={clsx("w-full", "hidden lg:flex items-center", "mx-auto")}>
      <DocRefineLogo />
      <div
        className={clsx(
          "flex-1",
          "flex",
          "justify-end",
          "items-center",
          "gap-4",
        )}
      >
        <div className={clsx("hidden lg:flex items-center justify-start")}>
          <SearchBar
            CustomButton={React.forwardRef<
              HTMLButtonElement,
              React.PropsWithChildren<{}>
            >(function CustomButton(props, ref) {
              return <DocSearchButton ref={ref} {...props} variant="doc" />;
            })}
          />
        </div>

        <div className={clsx("lg:hidden flex")}>
          <SearchBar
            CustomButton={React.forwardRef<
              HTMLButtonElement,
              React.PropsWithChildren<{}>
            >(function CustomButton(props, ref) {
              return (
                <DocSearchButton ref={ref} {...props} iconOnly variant="doc" />
              );
            })}
          />
        </div>

        <DocVersionDropdown />

        <CommonGithubStarButton />

        <CommonThemeToggle className={clsx("scale-75", "sm:scale-100")} />
      </div>
    </div>
  );
};

export const Mobile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={clsx("w-full", "flex lg:hidden items-center justify-between")}
    >
      <DocRefineLogo />
      <div className={clsx("flex items-center gap-4")}>
        <SearchBar
          CustomButton={React.forwardRef<
            HTMLButtonElement,
            React.PropsWithChildren<{}>
          >(function CustomButton(props, ref) {
            return <DocSearchButton ref={ref} {...props} iconOnly />;
          })}
        />
        <CommonHamburgerIcon
          onClick={() => setIsSidebarOpen(true)}
          active={isSidebarOpen}
        />
      </div>
      <DocSidebarModal
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};
