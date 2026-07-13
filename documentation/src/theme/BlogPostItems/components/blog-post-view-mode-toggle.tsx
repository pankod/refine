import React from "react";
import clsx from "clsx";

type BlogPostViewMode = "grid" | "list";

type BlogPostViewModeToggleProps = {
  viewMode: BlogPostViewMode;
  onChange: (nextViewMode: BlogPostViewMode) => void;
};

export function BlogPostViewModeToggle({
  viewMode,
  onChange,
}: BlogPostViewModeToggleProps) {
  return (
    <div
      className={clsx(
        "ml-auto",
        "flex",
        "items-center",
        "rounded-2xl",
        "border",
        "border-zinc-200",
        "dark:border-zinc-800",
        "p-2",
      )}
    >
      <div
        className={clsx(
          "ml-auto",
          "flex",
          "items-center",
          "rounded-lg",
          "bg-white",
          "dark:bg-zinc-950",
          "p-1",
        )}
      >
        <button
          type="button"
          onClick={() => onChange("list")}
          aria-label="List view"
          className={clsx(
            "h-8",
            "w-8",
            "rounded-[0.25rem]",
            "inline-flex",
            "items-center",
            "justify-center",
            "transition-colors",
            viewMode === "list" &&
              "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white",
            viewMode !== "list" && "text-zinc-500 dark:text-zinc-400",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.333 4H14M5.333 8H14m-8.667 4H14M2 4h.007M2 8h.007M2 12h.007"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => onChange("grid")}
          aria-label="Grid view"
          className={clsx(
            "h-8",
            "w-8",
            "rounded-[0.25rem]",
            "inline-flex",
            "items-center",
            "justify-center",
            "transition-colors",
            viewMode === "grid" &&
              "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white",
            viewMode !== "grid" && "text-zinc-500 dark:text-zinc-400",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 2H2.667A.667.667 0 0 0 2 2.667V6c0 .368.298.667.667.667H6A.667.667 0 0 0 6.667 6V2.667A.667.667 0 0 0 6 2ZM13.333 2H10a.667.667 0 0 0-.667.667V6c0 .368.299.667.667.667h3.333A.667.667 0 0 0 14 6V2.667A.667.667 0 0 0 13.333 2ZM13.333 9.333H10a.667.667 0 0 0-.667.667v3.333c0 .368.299.667.667.667h3.333a.667.667 0 0 0 .667-.667V10a.667.667 0 0 0-.667-.667ZM6 9.333H2.667A.667.667 0 0 0 2 10v3.333c0 .368.298.667.667.667H6a.667.667 0 0 0 .667-.667V10A.667.667 0 0 0 6 9.333Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
