import clsx from "clsx";
import React from "react";
import { TerminalIcon } from "./icons/terminal";

export const SwizzleBadge = () => {
  return (
    <div
      className={clsx(
        "text-xs",
        "font-jetBrains-mono",
        "text-indigo-100",
        "bg-indigo-900",
        "py-2 pl-2 pr-4",
        "rounded-md",
        "flex gap-2 items-center",
      )}
    >
      <TerminalIcon className="w-4 h-4" />
      <span>Swizzle Ready</span>
    </div>
  );
};
