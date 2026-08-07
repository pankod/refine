import clsx from "clsx";
import React from "react";
import { TriangleDownIcon } from "./icons/triangle-down";

export const CommonSummary = ({ children, className, ...props }) => {
  return (
    <summary
      className={clsx(
        "bg-zinc-50 dark:bg-zinc-950",
        "!p-2",
        "flex items-center",
        "gap-2",
        "before:hidden",
        "-mb-px",
        "border-b border-b-zinc-200 dark:border-b-zinc-700",
      )}
      {...props}
    >
      <div className={clsx("w-6 h-6", "flex items-center justify-center")}>
        <TriangleDownIcon
          className={clsx(
            "refine-details-triangle",
            "text-zinc-500",
            "w-4 h-4",
          )}
        />
      </div>
      <span className="text-zinc-900 dark:text-white text-base">
        {children}
      </span>
    </summary>
  );
};

export default CommonSummary;
