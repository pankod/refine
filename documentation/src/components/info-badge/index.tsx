import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { BadgeTooltip } from "../badge-tooltip";

type Props = {
  id: string;
  icon: React.ReactNode;
  color: "orange" | "green" | "purple" | "blue" | "gray";
  text?: string;
  description: React.ReactNode;
};

export const InfoBadge = ({ id, icon, color, text, description }: Props) => {
  const classes = clsx(
    color === "orange" &&
      clsx(
        "bg-orange-100 dark:bg-orange-950",
        "text-orange-700 dark:text-orange-300",
      ),
    color === "green" &&
      clsx(
        "bg-emerald-100 dark:bg-emerald-950",
        "text-emerald-700 dark:text-emerald-300",
      ),
    color === "purple" &&
      clsx(
        "bg-purple-100 dark:bg-purple-950",
        "text-purple-700 dark:text-purple-300",
      ),
    color === "blue" &&
      clsx("bg-blue-100 dark:bg-blue-950", "text-blue-700 dark:text-blue-300"),
    color === "gray" &&
      clsx("bg-zinc-200 dark:bg-zinc-800", "text-zinc-900 dark:text-zinc-300"),
  );

  return (
    <BadgeTooltip content={description}>
      <Link
        to={`/core/docs/${id}`}
        className={clsx(
          "-mt-px",
          "mr-1.5",
          "rounded-lg",
          "inline-flex",
          "items-center",
          "justify-center",
          "text-sm",
          "no-underline",
          "gap-1.5",
          "h-8",
          "w-8",
          "[&>svg]:hover:scale-110",
          "[&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out",
          classes,
        )}
      >
        {icon}
        {text && <span className="text-xs leading-[0.875rem]">{text}</span>}
      </Link>
    </BadgeTooltip>
  );
};
