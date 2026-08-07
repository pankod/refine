import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { socialLinks } from "./footer-data";
import { RefineCoreLogoIcon } from "./icons/refine-logo";

export const CommonFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={clsx("py-4", "px-4", "dark:bg-[#202023] bg-zinc-50")}>
      <div
        className={clsx(
          "mx-auto",
          "flex w-full items-center justify-between",
          "flex-col-reverse md:flex-row gap-8",
          "text-sm",
          "dark:text-white text-zinc-900",
        )}
      >
        <Link
          to="/core/"
          className={clsx(
            "appearance-none",
            "hover:no-underline",
            "flex",
            "items-center",
          )}
        >
          <RefineCoreLogoIcon /> <div className="ml-1">© {currentYear}</div>
        </Link>

        <div
          className={clsx(
            "flex flex-col md:flex-row justify-center items-center",
          )}
        >
          <a
            href="https://refine.dev/"
            className={clsx("hover:no-underline", "md:mr-12")}
          >
            Refine Home
          </a>
          <Link
            to="/core/tutorial/essentials/intro/"
            className={clsx(
              "appearance-none",
              "hover:no-underline",
              "md:mr-12",
            )}
          >
            Tutorial
          </Link>
          <div className={clsx("md:mr-4")}>Join us on</div>
          <div
            className={clsx(
              "flex gap-4",
              "dark:text-zinc-400 text-zinc-500",
              "mt-4 md:mt-0",
            )}
          >
            {socialLinks.map(({ href, icon: Icon }, i) => {
              return (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className={clsx("flex items-center no-underline")}
                >
                  <Icon className={clsx("w-9 h-9 sm:w-6 sm:h-6")} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
