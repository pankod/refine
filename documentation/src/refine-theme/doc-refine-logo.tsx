import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { openFigma } from "../utils/open-figma";
import { RefineCoreLogoIcon } from "./icons/refine-logo";

interface Props {
  className?: string;
}

export const DocRefineLogo = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "flex",
        "items-center justify-start",
        "gap-2",
        "no-underline",
        className,
      )}
    >
      <Link
        to="/core"
        className={clsx(
          "no-underline",
          "flex items-center gap-2",
          "hover:text-white",
        )}
        onContextMenu={openFigma}
      >
        <RefineCoreLogoIcon />
      </Link>
      <span
        className={clsx(
          "block",
          "h-6",
          "w-px",
          "mx-1",
          "bg-zinc-200 dark:bg-zinc-600",
        )}
      />
      <Link to="/core/docs" className={clsx("no-underline")}>
        <span
          className={clsx(
            "block",
            "text-zinc-900 dark:text-white",
            "text-base font-normal",
            "tracking-[-0.007em]",
          )}
        >
          Documentation
        </span>
      </Link>
    </div>
  );
};
