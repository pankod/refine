import React from "react";
import clsx from "clsx";

type Props = {
  icon: React.ReactNode;
  children: React.ReactNode;
  alignmentClass?: string;
};

export const LandingTile = ({
  icon,
  children,
  alignmentClass = "landing-lg:flex-col",
}: Props) => {
  return (
    <div
      className={clsx(
        "rounded-xl",
        "p-px",
        "overflow-hidden",
        "group",
        "max-w-[304px]",
        "row-span-1",
        "h-[96px]",
        "landing-lg:h-auto",
        "bg-landing-tile-border-bg",
      )}
    >
      <div
        className={clsx(
          "w-full",
          "h-full",
          "bg-refine-bg",
          "bg-landing-tile-tile-bg",
          "rounded-[13px]",
          "overflow-hidden",
          "p-2",
        )}
      >
        <div
          className={clsx(
            "h-full",
            "flex",
            "gap-4",
            alignmentClass,
            "px-2",
            "landing-lg:px-6",
            "pt-2",
            "landing-lg:pt-6",
            "pb-0",
            "landing-lg:pb-6",
            "bg-landing-tile-grid-mobile-bg",
            "landing-lg:bg-landing-tile-grid-bg",
            "bg-[length:100%_100%]",
            "landing-lg:bg-contain",
          )}
        >
          <div
            className={clsx(
              // "landing-lg:w-full",
              "flex items-start landing-lg:items-center justify-start",
            )}
          >
            <div
              className={clsx(
                "w-12",
                "h-12",
                "landing-lg:w-16",
                "landing-lg:h-16",
                "flex-shrink-0",
                "border border-refine-landing-tile-icon-border",
                "rounded-full",
                "bg-refine-bg",
                "flex items-center justify-center",
              )}
            >
              {icon}
            </div>
          </div>
          <div className={clsx("text-base", "text-gray-0")}>{children}</div>
        </div>
      </div>
    </div>
  );
};
