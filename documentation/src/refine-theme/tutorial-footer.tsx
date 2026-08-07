import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { socialLinks } from "./footer-data";

export const TutorialFooter = () => {
  return (
    <footer
      className={clsx(
        "hidden tutorial-md:block",
        "py-4",
        "px-4",
        "dark:bg-zinc-800 bg-white",
        "border-t dark:border-t-zinc-700 border-t-zinc-300",
      )}
    >
      <div
        className={clsx(
          "mx-auto",
          "flex w-full items-center justify-between",
          "flex-col-reverse sm:flex-row gap-8",
        )}
      >
        <div
          className={clsx(
            "text-sm",
            "leading-6",
            "dark:text-zinc-400 text-zinc-500",
          )}
        >
          Refine © {new Date().getFullYear()}
        </div>

        <div
          className={clsx(
            "flex",
            "flex-row",
            "items-center",
            "justify-end",
            "flex-1",
            "gap-12",
          )}
        >
          <Link
            to="/core/"
            className={clsx(
              "hover:no-underline",
              "hover:text-refine-link-light",
              "dark:hover:text-refine-link-dark",
            )}
          >
            Refine Home
          </Link>
          <Link
            to="/core/docs/"
            className={clsx(
              "hover:no-underline",
              "hover:text-refine-link-light",
              "dark:hover:text-refine-link-dark",
            )}
          >
            Documentation
          </Link>
          <div
            className={clsx(
              "flex flex-col sm:flex-row justify-center items-center",
            )}
          >
            <div
              className={clsx(
                "dark:text-white text-zinc-800",
                "text-sm leading-6",
                "sm:mr-4",
              )}
            >
              Join us on
            </div>
            <div
              className={clsx(
                "flex gap-4",
                "dark:text-zinc-400 text-zinc-500",
                "mt-4 sm:mt-0",
              )}
            >
              {socialLinks.map(({ href, icon: Icon }, i) => {
                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    className={clsx(
                      "flex items-center no-underline",
                      "hover:text-refine-link-light",
                      "dark:hover:text-refine-link-dark",
                    )}
                  >
                    <Icon className={clsx("w-9 h-9 sm:w-6 sm:h-6")} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
