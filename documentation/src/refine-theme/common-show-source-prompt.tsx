import React from "react";
import { GithubIcon } from "./icons/github";
import clsx from "clsx";

type Props = {
  path: string;
};

export const CommonShowSourcePrompt = ({ path }: Props) => {
  return (
    <div
      className={clsx(
        "refine-wider-container",
        "py-2",
        "px-2",
        "text-base",
        "font-sans",
        "flex items-center",
        "gap-2",
        "rounded-lg",
        "dark:bg-zinc-950",
        "bg-zinc-50",
        "mb-6",
      )}
    >
      <GithubIcon className="ml-1.5 w-5 h-5 text-zinc-900 dark:text-white" />
      <a
        href={path}
        target="_blank"
        rel="noopener"
        className={clsx(
          "text-base",
          "leading-8",
          "text-refine-react-light-link dark:text-refine-react-dark-link",
        )}
      >
        <span>View Source Code</span>
      </a>
    </div>
  );
};
