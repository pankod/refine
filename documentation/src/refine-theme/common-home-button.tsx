import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
};

export const CommonHomeButton = ({ className }: Props) => {
  return (
    <Link
      href="/core"
      className={clsx(
        "text-base",
        "text-gray-500 dark:text-gray-400",
        "no-underline",
        "transition-colors",
        "duration-200",
        "ease-in-out",
        "whitespace-nowrap",
        className,
      )}
    >
      Refine Home
    </Link>
  );
};
