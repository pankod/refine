import clsx from "clsx";
import React from "react";
import { AlignJustifyIcon } from "./icons/align-justify";
import { AlignLeftIcon } from "./icons/align-left";

export const CommonWordWrapButton = ({ onClick, isEnabled }) => {
  const Icon = isEnabled ? AlignJustifyIcon : AlignLeftIcon;

  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={clsx(
        "refine-code-block-word-wrap-button",
        "w-6 h-6",
        "flex justify-center items-center",
        "bg-zinc-100",
        "dark:bg-zinc-700",
        "hover:bg-zinc-200",
        "dark:hover:bg-refine-react-dark-code",
        "rounded",
        "group",
        "transition-[background-color] duration-200 ease-in-out",
      )}
      aria-label={"Toggle word wrap"}
      title={"Toggle word wrap"}
    >
      <Icon
        className={clsx(
          "w-3 h-3",
          "text-zinc-500",
          "dark:text-zinc-400",
          isEnabled && "rotate-[360deg]",
          "transition-all duration-200 ease-in-out",
        )}
      />
    </button>
  );
};
