import React from "react";
import clsx from "clsx";

import { PREVIEW_URL } from "./preview-url";

export const MUIExample = () => (
  <div className={clsx("pb-6")}>
    <div
      className={clsx(
        "h-[600px]",
        "mx-auto",
        "max-w-screen-xl",
        "w-full",
        "px-2",
        "md:px-4",
        "xl:px-6",
        "absolute",
        "left-0",
        "right-0",
      )}
    >
      <div
        className={clsx(
          "border border-gray-200 dark:border-gray-600",
          "relative",
          "overflow-hidden",
          "rounded-xl",
          "landing-xl:rounded-2xl",
          "overflow-hidden",
          "w-full",
          "h-full",
        )}
      >
        <iframe
          title="MUI Example"
          className={clsx("h-full", "w-full")}
          src={PREVIEW_URL}
        />
      </div>
    </div>
    <div className={clsx("h-[600px]")} />
  </div>
);
