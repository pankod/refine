import React from "react";
import clsx from "clsx";
import { useCommunityStatsContext } from "../context/CommunityStats";
import { OrangeStarIcon } from "./icons/orange-star";
import { Spinner } from "./spinner";

export const LandingHeroGithubStars = () => {
  const { loading, githubStarCountText } = useCommunityStatsContext();

  return (
    <a
      href="https://github.com/refinedev/refine"
      target="_blank"
      rel="noopener"
      className={clsx(
        "self-start",
        "relative",
        "rounded-[40px]",
        "hover:no-underline",
        "h-8",
        "flex",
        "gap-2",
        "items-center",
        "justify-center",
        "pt-2",
        "pr-4",
        "pb-2",
        "pl-2",
        "border",
        "border-zinc-800",
        "bg-zinc-950",
        "backdrop-blur-[8px]",
      )}
    >
      <div className={clsx("flex", "gap-2", "items-center", "justify-center")}>
        <OrangeStarIcon />
        <span
          className={clsx(
            "font-normal",
            "text-xs",
            "tracking-[-0.006em]",
            "text-white",
          )}
        >
          <span className="text-xs">
            {loading ? (
              <Spinner
                className={clsx("w-3.5 h-3.5", "inline")}
                wrapperProps={{
                  className: clsx("h-3.5", "inline-block", "w-[4ch]"),
                }}
              />
            ) : (
              <span className="text-xs">{githubStarCountText}</span>
            )}
          </span>{" "}
          <span className="text-xs">GitHub stars so far</span>
        </span>
      </div>
    </a>
  );
};
