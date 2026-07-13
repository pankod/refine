import React from "react";
import clsx from "clsx";
import SearchBar from "../theme/SearchBar";
import { MagnifierIcon } from "./icons/magnifier";

export const BlogSearch = () => {
  return (
    <SearchBar
      CustomButton={React.forwardRef<
        HTMLButtonElement,
        React.PropsWithChildren<{}>
      >(function CustomButton(props, ref) {
        return (
          <button
            type="button"
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
              "transition-colors",
              "blog-md:w-[304px]",
              "blog-md:items-start",
              "blog-md:justify-start",
              "blog-md:bg-white",
              "blog-md:dark:bg-[#18181B]",
            )}
            {...props}
            ref={ref}
            aria-label="Search blog"
          >
            <MagnifierIcon
              className={clsx("h-5 w-5 text-zinc-400 blog-md:hidden")}
            />

            <div
              className={clsx(
                "hidden",
                "h-5",
                "flex-1",
                "flex-row",
                "items-center",
                "justify-center",
                "gap-2",
                "blog-md:flex",
              )}
            >
              <MagnifierIcon
                className={clsx("h-5 w-5 shrink-0 text-zinc-500")}
              />
              <span
                className={clsx(
                  "h-5",
                  "flex-1",
                  "text-left",
                  "text-sm",
                  "font-normal",
                  "leading-5",
                  "tracking-[-0.007em]",
                  "text-zinc-600",
                  "dark:text-zinc-400",
                )}
              >
                Search blog
              </span>
            </div>
          </button>
        );
      })}
    />
  );
};
