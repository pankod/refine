import React from "react";
import clsx from "clsx";

import { Feed } from "src/components/feed";
import { Packages } from "src/components/packages";

export const Overview = () => {
  return (
    <div
      className={clsx(
        "flex-1",
        "re-h-full",
        "re-overflow-auto",
        "large:re-overflow-clip",
      )}
    >
      <div
        className={clsx(
          "re-h-auto",
          "large:re-h-full",
          "re-flex",
          "re-flex-col",
          "large:re-flex-row",
          "re-gap-8",
          "re-w-full",
          "re-max-w-full",
          "re-overflow-hidden",
          "re-px-10",
          "large:re-px-0",
          "re-max-w-[640px]",
          "large:re-max-w-none",
          "re-mx-auto",
          "large:re-mx-0",
        )}
      >
        <Feed />
        <div
          className={clsx(
            "re-hidden",
            "large:re-block",
            "re-h-auto",
            "re-w-px",
            "re-bg-gray-700",
            "re-flex-shrink-0",
          )}
        />
        <Packages />
      </div>
    </div>
  );
};
