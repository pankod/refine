import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { openFigma } from "../utils/open-figma";
import { RefineCoreLogoIcon } from "./icons/refine-logo";

interface Props {
  title?: string;
  className?: string;
}

export const RefineLogo = ({ title, className }: Props) => {
  return (
    <div className={clsx("flex", "items-center", className)}>
      <Link
        to="/core/docs"
        className={clsx(
          "flex",
          "items-center justify-center",
          "gap-3",
          "no-underline",
        )}
        onContextMenu={openFigma}
      >
        <RefineCoreLogoIcon
          className={clsx(
            "text-gray-900 dark:text-gray-0",
            "w-[64px] h-[20px] sm:w-[88px] sm:h-[24px]",
          )}
        />
        {title && (
          <span
            className={clsx(
              "text-gray-500 dark:text-gray-0",
              "mt-px sm:mt-0 text-[11px] sm:text-base leading-none font-normal",
            )}
          >
            Documentation
          </span>
        )}
      </Link>
    </div>
  );
};
