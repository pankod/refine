import clsx from "clsx";
import React from "react";
import { MagnifierIcon } from "./icons/magnifier";

export type DocSearchButtonProps = React.ComponentProps<"button"> & {
  iconOnly?: boolean;
  iconClassName?: string;
  placeholder?: string;
  shortcutClassName?: string;
  variant?: "landing" | "doc";
};

export const DocSearchButton = React.forwardRef<
  HTMLButtonElement,
  DocSearchButtonProps
>(function DocSearchButtonComponent(
  {
    iconOnly = false,
    iconClassName,
    className,
    placeholder,
    shortcutClassName,
    variant = "doc",
    ...props
  },
  ref,
) {
  const isLanding = variant === "landing";

  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={clsx(
        "flex items-center",
        "gap-2",
        "text-sm",
        "transition-[filter]",
        "duration-200",
        "ease-in-out",
        "rounded-lg",
        isLanding && "bg-zinc-800",
        isLanding && "text-zinc-300",
        !isLanding && "bg-transparent",
        !isLanding && "text-zinc-500 dark:text-zinc-300",
        !isLanding && "border border-zinc-200 dark:border-zinc-700",
        {
          "justify-center": iconOnly,
          "hover:brightness-110": iconOnly,
          "w-10 h-10": iconOnly,
          "py-3 px-2.5": !iconOnly,
          "justify-between": !iconOnly,
          "w-[152px] h-10": !iconOnly,
        },
        className,
      )}
    >
      <MagnifierIcon className={clsx("w-5 h-5", iconClassName)} />
      {!iconOnly && (
        <>
          <span
            className={clsx(
              "text-left flex-1",
              "text-sm",
              "font-medium",
              "tracking-[-0.007em]",
            )}
          >
            {placeholder ?? "Search"}
          </span>
          <div
            className={clsx(
              isLanding && "bg-zinc-900",
              isLanding && "text-zinc-400",
              !isLanding && "bg-zinc-200 dark:bg-zinc-900",
              !isLanding && "text-zinc-500 dark:text-zinc-400",
              "py-0.5 px-1.5",
              "rounded",
              "text-xs",
              "font-normal",
              "tracking-[-0.006em]",
              shortcutClassName,
            )}
          >
            ⌘K
          </div>
        </>
      )}
    </button>
  );
});
