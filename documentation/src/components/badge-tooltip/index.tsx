import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  content?: React.ReactNode;
};

export const BadgeTooltip = ({ children, content }: Props) => {
  return (
    <div
      className={clsx(
        "refine-info-badge",
        "relative",
        "group",
        "inline-flex",
        "align-middle",
      )}
    >
      {children}
      <div
        className={clsx(
          "absolute",
          "-left-1",
          "top-0",
          "translate-x-0",
          "-translate-y-0",
          "scale-0",
          "group-hover:scale-100",
          "group-hover:-translate-y-full",
          "transition-transform",
          "origin-top-left",
          "pb-2",
          "w-60",
          "pointer-events-none",
        )}
      >
        <div
          className={clsx(
            "text-xs",
            "text-gray-600",
            "bg-gray-0",
            "border",
            "border-gray-200",
            "shadow-sm",
            "rounded",
            "py-1",
            "px-2",
            "font-normal",
          )}
        >
          {content ?? "Check the guide for more information"}
        </div>
      </div>
    </div>
  );
};
