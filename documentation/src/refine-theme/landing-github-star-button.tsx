import clsx from "clsx";
import React from "react";
import { useCommunityStatsContext } from "../context/CommunityStats";
import { StarIcon } from "lucide-react";
import { Spinner } from "./spinner";

export const LandingGithubStarButton = () => {
  const { loading, githubStarCountText } = useCommunityStatsContext();

  return (
    <a
      href="https://github.com/refinedev/refine"
      target="_blank"
      rel="noopener"
      className={clsx(
        "flex gap-2 items-center justify-center",
        "font-medium",
        "text-base",
        "text-zinc-300",
        "hover:text-zinc-200",
        "hover:no-underline",
        "transition-colors",
        "duration-200",
        "ease-in-out",
        "pl-2.5",
        "pr-4",
        "h-10",
        "min-w-[102px]",
        "bg-zinc-800",
        "rounded-lg",
        "font-jetBrains-mono",
        "tabular-nums",
      )}
    >
      {/* @ts-expect-error - lucide-react type issue */}
      <StarIcon className={clsx("w-5 h-5", "text-orange-400")} />
      <div className={clsx("flex items-center")}>
        {loading ? (
          <Spinner
            className={clsx("w-5 h-5")}
            wrapperProps={{
              className: clsx("mx-auto"),
            }}
          />
        ) : (
          <span>{githubStarCountText}</span>
        )}
      </div>
    </a>
  );
};
