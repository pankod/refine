import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export default function Tag({
  permalink,
  label,
  isActive,
  size = "small",
  variant = "default",
}) {
  const shouldUppercase = label.length <= 3;
  const isRefineTag =
    label.toLowerCase() === "refine" ||
    label.toLowerCase() === "refine core" ||
    label.toLowerCase() === "refine-core";

  return (
    <Link
      href={permalink}
      className={clsx(
        shouldUppercase && "uppercase",
        isRefineTag && "capitalize",
        "no-underline hover:no-underline",
        "rounded-sm",
        "font-medium",
        "tracking-[-0.006em]",
        size === "small" && "text-xs",
        size === "small" && "py-1",
        size === "small" && "px-1.5",
        size === "medium" && "text-sm",
        size === "medium" && "py-2",
        size === "medium" && "px-4",
        "text-zinc-900 dark:text-white",
        variant === "default" && "bg-zinc-200 dark:bg-zinc-700",
        variant === "inverted" && "bg-zinc-200 dark:bg-zinc-700",
      )}
    >
      {label}
    </Link>
  );
}
