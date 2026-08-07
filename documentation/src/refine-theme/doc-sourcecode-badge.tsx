import clsx from "clsx";
import React from "react";
import { GithubIcon } from "./icons/github";

export const SourceCodeBadge = ({ path }: { path?: string }) => {
  const sourcePath = path.startsWith("https://")
    ? path
    : `https://github.com/refinedev/refine/blob/main${
        path.startsWith("/") ? "" : "/"
      }${path}`;

  return (
    <a
      href={sourcePath}
      target="_blank"
      rel="noopener"
      className={clsx(
        "text-xs",
        "font-jetBrains-mono",
        "text-fuchsia-100",
        "bg-fuchsia-900",
        "py-2 pl-2 pr-4",
        "rounded-md",
        "flex gap-2 items-center",
        "hover:no-underline hover:text-fuchsia-100",
      )}
    >
      <GithubIcon className="w-4 h-4" />
      <span>Source Code</span>
    </a>
  );
};
