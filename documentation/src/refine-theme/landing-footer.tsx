import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { openFigma } from "../utils/open-figma";
import { menuItems, secondaryMenuItems, socialLinks } from "./footer-data";
import { HeartOutlinedIcon } from "./icons/heart-outlined";
import { PHBadgeIcon } from "./icons/ph-badge";
import { RefineLogoSingleIcon } from "./icons/refine-logo-single";

export type Props = {
  variant?: "landing" | "blog";
};

export const LandingFooter = ({ variant = "landing" }: Props) => {
  const isLanding = variant === "landing";

  const info = (
    <div
      className={clsx(
        "py-6 landing-lg:py-0",
        "flex",
        "flex-col",
        "gap-4",
        "landing-lg:max-w-[224px]",
      )}
    >
      <div
        className={clsx(
          "font-semibold",
          "text-sm",
          "leading-6",
          isLanding && "text-white",
          !isLanding && "text-zinc-900 dark:text-zinc-300",
        )}
      >
        Refine Inc.
      </div>
      <div
        className={clsx(
          "font-normal",
          "text-sm",
          "leading-5",
          isLanding && "text-zinc-400",
          !isLanding && "text-zinc-600 dark:text-zinc-400",
        )}
      >
        447 Sutter St 405, San Francisco
      </div>
      <a
        href="mailto:info@refine.dev"
        className={clsx(
          "font-normal",
          "text-sm",
          "leading-5",
          isLanding && "text-zinc-400",
          !isLanding && "text-zinc-600 dark:text-zinc-400",
          "hover:text-zinc-900 dark:hover:text-zinc-200",
          "hover:no-underline",
        )}
      >
        info@refine.dev
      </a>
    </div>
  );

  const social = (
    <div
      className={clsx(
        "py-6 landing-lg:py-0",
        "flex",
        "flex-col",
        "landing-sm:items-end",
      )}
    >
      <div className={clsx("flex", "flex-col", "gap-4")}>
        <div
          className={clsx(
            "text-sm",
            "leading-6",
            "font-semibold",
            isLanding && "text-white",
            !isLanding && "text-zinc-900 dark:text-zinc-300",
            "landing-lg:text-right",
          )}
        >
          Join us on
        </div>
        <div
          className={clsx(
            "flex",
            "items-center",
            "gap-8",
            "landing-lg:gap-4",
            "justify-start",
          )}
        >
          {socialLinks.map(({ href, icon: Icon }) => (
            <a
              href={href}
              key={href}
              target="_blank"
              rel="noopener"
              className={clsx(
                isLanding && "text-zinc-400",
                !isLanding && "text-zinc-600 dark:text-zinc-400",
                "hover:text-zinc-900 dark:hover:text-zinc-200",
                "hover:no-underline",
              )}
            >
              <Icon
                className={clsx("w-8 h-8", "landing-lg:w-6 landing-lg:h-6")}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <footer className={clsx("w-full")}>
      <div
        className={clsx(
          "border-t border-t-solid",
          isLanding && "border-t-zinc-700",
          !isLanding && "border-t-zinc-200 dark:border-t-zinc-700",
          isLanding && "bg-zinc-800",
          !isLanding && "bg-zinc-50 dark:bg-zinc-800",
        )}
      >
        <div
          className={clsx(
            "grid",
            "grid-cols-1",
            "max-w-screen-landing-md",
            "landing-lg:max-w-screen-landing-lg",
            "mx-auto",
          )}
        >
          <div
            className={clsx(
              "px-4 landing-sm:px-8 landing-lg:px-12",
              "py-4",
              "flex",
              "items-center",
              "justify-between",
            )}
          >
            <Link
              to="/core"
              onContextMenu={openFigma}
              className={clsx(
                "hover:no-underline",
                isLanding && "text-white",
                !isLanding && "text-zinc-900 dark:text-white",
              )}
            >
              <RefineLogoSingleIcon className="w-6 h-6" />
            </Link>
            <a
              href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3"
              target="_blank"
              rel="noopener"
              className={clsx("hover:no-underline")}
            >
              <PHBadgeIcon
                className={clsx(
                  isLanding && "text-white",
                  !isLanding && "text-zinc-600 dark:text-white",
                  isLanding && "fill-zinc-900",
                  !isLanding && "fill-zinc-100 dark:fill-zinc-700",
                )}
              />
            </a>
          </div>
          <div
            className={clsx(
              "px-4 landing-sm:px-8 landing-lg:px-12",
              "py-6 landing-lg:pb-12",
              "flex",
              "flex-row",
              "flex-wrap",
              "items-start",
              "justify-start",
              "gap-6",
            )}
          >
            <div
              className={clsx(
                "hidden",
                "landing-lg:flex",
                "max-w-[282px]",
                "w-full",
              )}
            >
              {info}
            </div>
            {menuItems.map((menu) => (
              <div
                className={clsx("flex flex-col gap-4", "min-w-[152px]")}
                key={menu.label}
              >
                <div
                  className={clsx(
                    "text-sm",
                    "leading-6",
                    "font-semibold",
                    isLanding && "text-white",
                    !isLanding && "text-zinc-600 dark:text-white",
                  )}
                >
                  {menu.label}
                </div>
                <div className={clsx("flex", "flex-col", "gap-2")}>
                  {menu.items.map((item) => (
                    <a
                      href={item.href}
                      key={item.label}
                      {...(item.href.startsWith("http")
                        ? {
                            target: "_blank",
                            rel: "noopener",
                          }
                        : {})}
                      className={clsx(
                        "text-sm",
                        "leading-5",
                        "hover:no-underline",
                        isLanding && "text-zinc-400",
                        !isLanding && "text-zinc-600 dark:text-zinc-400",
                        "hover:text-zinc-900 dark:hover:text-zinc-200",
                      )}
                    >
                      <div className={clsx("flex", "items-center", "gap-2")}>
                        {item.label}
                        {item.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className={clsx("hidden", "landing-lg:flex", "ml-auto")}>
              {social}
            </div>
          </div>
          <div
            className={clsx(
              "px-4 landing-sm:px-8",
              "grid",
              "grid-cols-1",
              "landing-sm:grid-cols-2",
              "landing-sm:gap-8",
              "landing-lg:hidden",
            )}
          >
            {info}
            {social}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "border-t border-t-solid",
          isLanding && "border-t-zinc-700",
          !isLanding && "border-t-zinc-200 dark:border-t-zinc-700",
          isLanding && "bg-zinc-900",
          !isLanding && "bg-zinc-100 dark:bg-zinc-700",
        )}
      >
        <div
          className={clsx(
            "py-6 landing-sm:py-8 landing-lg:py-6",
            "px-4 landing-sm:px-8 landing-lg:px-12",
            "grid",
            "grid-cols-1",
            "landing-md:grid-cols-2",
            "gap-8",
            "max-w-screen-landing-md",
            "landing-lg:max-w-screen-landing-lg",
            "mx-auto",
          )}
        >
          <div
            className={clsx(
              "flex",
              "flex-col",
              "landing-sm:flex-row",
              "gap-4",
              "items-start",
              "justify-start",
            )}
          >
            {secondaryMenuItems.map((menu) => (
              <a
                href={menu.href}
                key={menu.label}
                {...(menu.href.startsWith("http")
                  ? {
                      target: "_blank",
                      rel: "noopener",
                    }
                  : {})}
                className={clsx(
                  "min-w-[180px]",
                  "text-sm",
                  "leading-5",
                  "font-normal",
                  isLanding && "text-zinc-400",
                  !isLanding && "text-zinc-600 dark:text-zinc-400",
                  "hover:no-underline",
                  "hover:text-zinc-900 dark:hover:text-zinc-200",
                )}
              >
                {menu.label}
              </a>
            ))}
          </div>
          <div
            className={clsx(
              "text-left",
              "landing-md:text-right",
              "text-sm",
              "pr-6 landing-sm:pr-0",
              "leading-5",
              isLanding && "text-white",
              !isLanding && "text-zinc-900 dark:text-zinc-300",
              "font-normal",
            )}
          >
            {"© 2026, Refine from SF to wherever you are"}
            <HeartOutlinedIcon
              className={clsx("ml-1", "text-red-400", "inline", "leading-5")}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
