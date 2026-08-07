import React from "react";
import clsx from "clsx";

type Props = { version: string };

export const DocVersionBadge = ({ version }: Props) => {
  return (
    <div
      className={clsx(
        "text-xs",
        "py-[7px] px-4",
        "rounded-md",
        "font-jetBrains-mono",
        "border border-solid",
        "border-zinc-200 dark:border-zinc-700",
        "text-zinc-500 dark:text-zinc-400",
      )}
    >
      Version: {version}
    </div>
  );
};
