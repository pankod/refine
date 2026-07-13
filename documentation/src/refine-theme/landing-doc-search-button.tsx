import clsx from "clsx";
import React from "react";

type Props = React.ComponentProps<"button">;

export const LandingDocSearchButton = React.forwardRef<
  HTMLButtonElement,
  Props
>(function LandingDocSearchButtonComponent({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={clsx(
        "bg-refine-bg-alt",
        "text-gray-0",
        "pl-3 pr-1.5",
        "py-1.5",
        "rounded-lg",
        "w-36",
        "text-xs",
        "leading-5",
        "flex items-center justify-between",
        "hover:brightness-110",
        "transition-[filter]",
        "duration-200",
        "ease-in-out",
      )}
    >
      <span className="opacity-50">Search</span>
      <kbd
        className={clsx(
          "h-5",
          "border",
          "border-opacity-20",
          "py-px px-1",
          "rounded",
          "bg-refine-bg",
          "text-sm leading-4",
          "tracking-wide",
          "text-refine-kbd",
          "font-sans",
          "shadow-none",
        )}
      >
        ⌘K
      </kbd>
    </button>
  );
});
