import Link from "@docusaurus/Link";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";

import { HamburgerIcon } from "./icons/hamburger";

import { openFigma } from "../utils/open-figma";
import { TopAnnouncement } from "./top-announcement";

import { DocSearchButton } from "@site/src/refine-theme/doc-search-button";
import SearchBar from "../theme/SearchBar";
import { CommonGithubStarButton } from "./common-github-star-button";
import { CommonThemeToggle } from "./common-theme-toggle";
import { RefineCoreLogoIcon } from "./icons/refine-logo";
import { LandingGithubStarButton } from "./landing-github-star-button";

type Props = {
  hasSticky?: boolean;
  trackProgress?: boolean;
  className?: string;
  showThemeToggle?: boolean;
};

export const CommonHeader = ({
  trackProgress,
  className,
  showThemeToggle = true,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progressPercentage = useTransform(
    scrollYProgress,
    [0.03, 0.95],
    ["0%", "100%"],
  );

  return (
    <>
      <TopAnnouncement />
      <MobileMenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <header
        className={clsx(
          "sticky",
          "top-0",
          "z-20",
          !showThemeToggle && "border-b border-b-zinc-700",
          showThemeToggle &&
            "border-b border-b-gray-200 dark:border-b-zinc-700",
        )}
      >
        <div
          className={clsx(
            "absolute",
            "top-0 left-0 right-0",
            "backdrop-blur-[6px]",
            "landing-md:backdrop-blur-[12px]",
            "z-[-1]",
            !showThemeToggle && "bg-zinc-900 ",
            showThemeToggle && "bg-zinc-50 dark:bg-zinc-900",
            "pointer-events-none",
            className,
          )}
          style={{
            top: "-20px",
            bottom: "-80px",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0, transparent calc(0% + 20px), black calc(0% + 20px), black calc(100% - 80px), transparent calc(100% - 80px))",
            maskImage:
              "linear-gradient(to bottom, transparent 0, transparent calc(0% + 20px), black calc(0% + 20px), black calc(100% - 80px), transparent calc(100% - 80px))",
          }}
        />
        <div className={clsx("relative", "z-[1]")}>
          <div
            className={clsx(
              "mx-auto",
              "h-16",
              "flex",
              "items-center",
              "max-w-[896px]",
              "px-4 landing-md:px-0",
              "landing-lg:max-w-[1200px]",
            )}
          >
            <div className={clsx("w-[152px]", "landing-lg:w-[204px]")}>
              <Link to="/core" onContextMenu={openFigma}>
                <RefineCoreLogoIcon />
              </Link>
            </div>
            <button
              type="button"
              className={clsx(
                !showThemeToggle && "text-white",
                showThemeToggle && "text-gray-900 dark:text-white",
                "block landing-md:hidden",
                "ml-auto",
              )}
              onClick={() => setIsModalOpen(true)}
            >
              <HamburgerIcon />
            </button>
            <div className={clsx("hidden landing-md:flex", "items-center")}>
              <NavLinksDesktop showThemeToggle={showThemeToggle} />
            </div>
            <div
              className={clsx(
                "hidden landing-md:flex",
                "items-center",
                "justify-end",
                "gap-4",
                "ml-auto",
              )}
            >
              <SearchBar
                CustomButton={React.forwardRef<
                  HTMLButtonElement,
                  React.PropsWithChildren<{}>
                >(function CustomButton(props, ref) {
                  return (
                    <>
                      <DocSearchButton
                        ref={ref}
                        {...props}
                        className={clsx("hidden", "landing-lg:flex")}
                        variant={showThemeToggle ? "doc" : "landing"}
                      />
                      <DocSearchButton
                        ref={ref}
                        iconOnly
                        {...props}
                        className={clsx("flex", "landing-lg:hidden")}
                        variant={showThemeToggle ? "doc" : "landing"}
                      />
                    </>
                  );
                })}
              />
              {showThemeToggle ? (
                <CommonGithubStarButton />
              ) : (
                <LandingGithubStarButton />
              )}
              {showThemeToggle && <CommonThemeToggle />}
            </div>
          </div>
        </div>
        {trackProgress && (
          <div
            className={clsx(
              "w-full",
              "h-[1px]",
              "translate",
              !showThemeToggle && "bg-zinc-700",
              showThemeToggle && "bg-gray-200 dark:bg-zinc-700",
            )}
          >
            {/* @ts-expect-error - framer-motion type issue */}
            <motion.div
              // @ts-expect-error - framer-motion type issue
              className={clsx(
                "h-full",
                !showThemeToggle && "bg-refine-react-dark-link",
                showThemeToggle &&
                  "bg-refine-blue dark:bg-refine-react-dark-link",
              )}
              style={{ width: progressPercentage }}
            />
          </div>
        )}
      </header>
    </>
  );
};

const LINKS = [
  {
    label: "Documentation",
    to: "/core/docs/",
  },
  {
    label: "Tutorial",
    to: "/core/tutorial/essentials/intro/",
  },
  {
    label: "Templates",
    to: "/core/templates/",
  },
  {
    label: "Integrations",
    to: "/core/integrations/",
  },
  {
    label: "Blog",
    to: "/blog/",
  },
];

const NavLinksDesktop = ({
  showThemeToggle,
}: {
  showThemeToggle?: boolean;
}) => {
  return (
    <nav
      className={clsx(
        "flex",
        "items-center",
        "gap-5 landing-lg:gap-8",
        "text-sm",
        "leading-5",
        "font-normal",
      )}
      style={{
        letterSpacing: "-0.007em",
      }}
    >
      {LINKS.map((link) => {
        return (
          <Link
            key={link.to}
            to={link.to}
            className={clsx(
              "whitespace-nowrap",
              !showThemeToggle && "text-white hover:text-white",
              showThemeToggle &&
                "text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white",
              "hover:no-underline",
              "transition-colors",
            )}
          >
            {link.label}
          </Link>
        );
      })}
      <div
        className={clsx(
          "h-6",
          "w-[1px]",
          !showThemeToggle && "bg-zinc-600",
          showThemeToggle && "bg-gray-300 dark:bg-zinc-600",
        )}
      />
      <Link
        key="Refine Home"
        to="https://refine.dev/"
        className={clsx(
          "whitespace-nowrap",
          "font-light",
          !showThemeToggle && "text-white hover:text-white",
          showThemeToggle &&
            "text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white",
          "hover:no-underline",
          "transition-colors",
        )}
      >
        Refine Home
      </Link>
    </nav>
  );
};

type MobileMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenuModal = ({ isOpen, onClose }: MobileMenuModalProps) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed",
        "inset-0",
        "z-[999]",
        "bg-zinc-900",
        "flex",
        "flex-col",
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "flex",
          "items-center",
          "justify-between",
          "px-4",
          "h-16",
          "border-b",
          "border-zinc-700",
        )}
      >
        <Link to="/core" onClick={onClose}>
          <RefineCoreLogoIcon className={clsx("!text-white")} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className={clsx(
            "flex",
            "items-center",
            "gap-2",
            "text-white",
            "text-sm",
            "font-normal",
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Menu</span>
        </button>
      </div>

      {/* Content */}
      <div className={clsx("flex-1", "px-4", "py-6", "overflow-auto")}>
        {/* Menu Grid */}
        <div
          className={clsx(
            "grid",
            "grid-cols-1",
            "landing-sm:grid-cols-2",
            "gap-3",
            "mb-6",
          )}
        >
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={clsx(
                "flex",
                "items-center",
                "justify-start",
                "px-4",
                "py-3.5",
                "bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white",
                "text-sm",
                "font-normal",
                "hover:no-underline",
                "transition-colors",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className={clsx("h-[1px]", "bg-zinc-700", "my-6")} />

        {/* Refine Home Link */}
        <Link
          to="https://refine.dev/"
          onClick={onClose}
          className={clsx(
            "flex",
            "items-center",
            "justify-start",
            "w-full",
            "landing-sm:w-1/2",
            "px-4",
            "py-3.5",
            "bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white",
            "text-sm",
            "font-normal",
            "hover:no-underline",
            "transition-colors",
          )}
        >
          Refine Home
        </Link>
      </div>

      {/* Footer */}
      <div
        className={clsx("px-6", "py-6", "border-t", "border-zinc-700 bg-black")}
      >
        <Link to="https://github.com/refinedev/refine" className="no-underline">
          <div className={clsx("flex items-center")}>
            <GithubBigStarIcon />
            <div className={clsx("ml-4", "text-white")}>
              If you like Refine, don’t forget to star us on GitHub!
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export const GithubBigStarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#FACC15"
      fillRule="evenodd"
      d="M25.375.215a4.488 4.488 0 0 0-2.75 0 4.483 4.483 0 0 0-2.53 2.047c-.085.15-.163.306-.232.466l-3.996 8.993a3.99 3.99 0 0 1-3.206 2.345l-8.658.962a4.5 4.5 0 0 0-2.685 7.654l7.205 7.205a3.99 3.99 0 0 1 1.073 3.687l-1.989 8.95a4.5 4.5 0 0 0 6.778 4.792l7.5-4.688a3.99 3.99 0 0 1 4.23 0l7.5 4.688a4.5 4.5 0 0 0 6.778-4.792l-1.99-8.95a3.99 3.99 0 0 1 1.074-3.687l7.205-7.205a4.5 4.5 0 0 0-2.685-7.654l-8.658-.962a3.99 3.99 0 0 1-3.206-2.345l-3.996-8.993A4.497 4.497 0 0 0 25.375.215Zm-9.13 14.714A11.895 11.895 0 0 1 24.057 12a11.899 11.899 0 0 1 7.737 2.963 12.371 12.371 0 0 1 4.048 7.359c.457 2.864-.09 5.8-1.548 8.291a12.102 12.102 0 0 1-6.415 5.322c-.613.12-.828-.19-.828-.59V31.97a2.965 2.965 0 0 0-.169-1.225 2.914 2.914 0 0 0-.651-1.041c2.684-.28 5.5-1.314 5.5-6.043a4.816 4.816 0 0 0-1.234-3.3 4.552 4.552 0 0 0-.148-3.233s-1.006-.332-3.305 1.262a11.164 11.164 0 0 0-6.034 0c-2.3-1.594-3.313-1.262-3.313-1.262a4.576 4.576 0 0 0-.118 3.256 4.816 4.816 0 0 0-1.235 3.3c0 4.675 2.81 5.733 5.487 6.042a2.638 2.638 0 0 0-.74 1.647 2.534 2.534 0 0 1-1.96.23 2.556 2.556 0 0 1-.895-.472 2.614 2.614 0 0 1-.65-.785 2.569 2.569 0 0 0-.777-.852 2.505 2.505 0 0 0-1.064-.417s-1.175 0-.088.755a3.286 3.286 0 0 1 1.338 1.805s.71 2.402 4.074 1.654v2.092c0 .325-.214.71-.82.597a12.095 12.095 0 0 1-6.507-5.301 12.524 12.524 0 0 1-1.588-8.345 12.37 12.37 0 0 1 4.09-7.405Z"
      clipRule="evenodd"
    />
  </svg>
);
