import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { openFigma } from "../utils/open-figma";

interface Props {
  className?: string;
}

export const TutorialRefineLogo = ({ className }: Props) => {
  return (
    <div className={clsx("flex", "items-center justify-center", "gap-4")}>
      <Link
        to="/core"
        className={clsx(
          "no-underline",
          "flex",
          "items-center justify-center",
          "w-16",
          "h-16",
          "no-underline",
          "bg-orange-50 dark:bg-orange-950",
          "border-t-0",
          "border-l-0",
          "border-b-0",
          "border-r border-2 border-zinc-50 dark:border-zinc-950",
          className,
        )}
        onContextMenu={openFigma}
      >
        <Logo className="text-orange-600 dark:text-orange-300" />
      </Link>
      <h2
        className={clsx(
          "text-sm",
          "font-semibold",
          "text-zinc-900 dark:text-white",
          "tracking-[-0.007em]",
        )}
      >
        Tutorial
      </h2>
    </div>
  );
};

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g fill="currentColor">
      <path
        fillRule="evenodd"
        d="M13.789.422a4 4 0 0 0-3.578 0l-8 4A4 4 0 0 0 0 8v8a4 4 0 0 0 2.211 3.578l8 4a4 4 0 0 0 3.578 0l8-4A4 4 0 0 0 24 16V8a4 4 0 0 0-2.211-3.578l-8-4ZM8 8a4 4 0 1 1 8 0v8a4 4 0 0 1-8 0V8Z"
        clipRule="evenodd"
      />
      <path d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </g>
  </svg>
);
