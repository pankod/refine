import React from "react";
import clsx from "clsx";
import { PlayOutlinedIcon } from "@site/src/refine-theme/icons/play-outlined";

type Props = {
  onClick?: () => void;
};

export const LetsStartButton = ({ onClick }: Props) => {
  return (
    <button
      {...(onClick ? { onClick } : {})}
      className={clsx(
        "z-[1]",
        "appearance-none",
        "focus:outline-none",
        "block",
        "relative",
        "text-refine-bg",
        "hover:no-underline",
        "hover:text-refine-bg",
        "z-[1]",
        "group",
      )}
    >
      <div
        className={clsx(
          "absolute",
          "-left-0.5",
          "-top-0.5",
          "blur",
          "overflow-hidden",
          "rounded-lg",
          "w-[calc(100%+0.25rem)] h-[calc(100%+0.25rem)]",
          "z-[-1]",
        )}
      >
        <div
          className={clsx(
            "absolute",
            "w-[125%] aspect-square h-auto",
            "left-[-12.5%]",
            "top-[-100px]",
            "bg-landing-rainbow",
            "animate-spin-slow",
            "animation-slower-speed",
            "animation-paused",
            "group-hover:animation-running",
          )}
        />
      </div>
      <div
        className={clsx(
          "bg-gray-0",
          "flex items-center justify-center",
          "rounded-lg",
          "w-[144px] h-[48px]",
        )}
      >
        <div
          className={clsx(
            "gap-2",
            "flex items-center justify-center",
            "group-hover:scale-105",
            "duration-100 ease-in-out transition-transform",
          )}
        >
          <PlayOutlinedIcon />
          <span className="text-base font-semibold">Let&apos;s Start!</span>
        </div>
      </div>
    </button>
  );
};
