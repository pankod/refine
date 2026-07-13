import React from "react";
import clsx from "clsx";

type Props = {
  image: React.ReactNode;
  children: React.ReactNode;
};

export const LandingTileWithImage = ({ image, children }: Props) => {
  return (
    <div
      className={clsx(
        "rounded-xl",
        "p-px",
        "overflow-hidden",
        "group",
        "max-w-[304px]",
        "row-span-1",
        "landing-md:row-span-3",
        "landing-lg:row-span-1",
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
        )}
      >
        <div
          className={clsx(
            "bg-[rgba(77,77,178,0.1)]",
            "bg-landing-tile-image-bg",
            "h-[183px]",
            "w-full",
            "border-b",
            "border-b-refine-landing-tile-image-border",
            "flex items-center justify-center",
          )}
        >
          {image}
        </div>
        <div className={clsx("p-8", "text-base", "text-gray-0")}>
          {children}
        </div>
      </div>
    </div>
  );
};
