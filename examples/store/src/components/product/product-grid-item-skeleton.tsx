import React from "react";
import clsx from "clsx";

export const ProductGridItemSkeleton = () => {
  return (
    <div className={clsx("group")}>
      <div
        className={clsx(
          "aspect-[9/10]",
          "bg-gray-lighter",
          "relative",
          "rounded-3xl",
          "animate-pulse",
          "overflow-hidden",
        )}
      />
      <div className={clsx("p-4", "flex", "flex-col")}>
        <div
          className={clsx(
            "text-base",
            "text-gray-darkest",
            "font-normal",
            "text-nowrap",
            "overflow-hidden",
            "text-ellipsis",
            "overflow-ellipsis",
            "capitalize",
            "bg-gray-lighter",
            "animate-pulse",
            "max-w-[200px]",
            "w-full",
            "h-5",
            "mb-2",
            "rounded",
          )}
        />
        <div
          className={clsx(
            "text-base",
            "text-gray-darker",
            "font-normal",
            "max-w-[100px]",
            "w-full",
            "h-4",
            "bg-gray-lighter",
            "animate-pulse",
            "rounded",
          )}
        />
      </div>
    </div>
  );
};
