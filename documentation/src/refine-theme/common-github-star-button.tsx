import clsx from "clsx";
import React from "react";
import { useCommunityStatsContext } from "../context/CommunityStats";
import { StarIcon } from "lucide-react";
import { Spinner } from "./spinner";

type Props = {
  className?: string;
};

export const CommonGithubStarButton = ({ className }: Props) => {
  const { githubStarCountText, loading } = useCommunityStatsContext();

  return (
    <a
      href="https://github.com/refinedev/refine"
      target="_blank"
      rel="noopener"
      className={clsx(
        "flex gap-2 items-center justify-center",
        "font-medium",
        "text-base",
        "text-zinc-500 dark:text-zinc-300",
        "hover:no-underline",
        "pl-2.5",
        "pr-4",
        "h-10",
        "min-w-[102px]",
        "rounded-lg",
        "border border-zinc-200 dark:border-zinc-700",
        "font-jetBrains-mono",
        "tabular-nums",
        "tracking-normal",
      )}
    >
      {/* @ts-expect-error - lucide-react type issue */}
      <StarIcon
        className={clsx("w-4 h-4", "text-orange-500", "dark:text-orange-400")}
      />
      <div className={clsx("flex items-center")}>
        {loading ? (
          <Spinner
            className={clsx("w-12 h-5")}
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
