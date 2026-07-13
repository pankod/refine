import React from "react";
import { FooterTwitterIcon as TwitterIcon } from "../../refine-theme/icons/footer-twitter";
import clsx from "clsx";

type Props = {
  href: string;
};

export const TwitterButton = ({ href }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={clsx(
        "no-underline",
        "flex items-center justify-center gap-2",
        "rounded-lg",
        "w-[144px] h-[48px]",
        "border border-gray-200 dark:border-gray-700",
      )}
    >
      <TwitterIcon
        className={clsx("text-gray-400 dark:text-gray-500")}
        width="24"
        height="24"
      />
      <span className={clsx("text-gray-700 dark:text-gray-500")}>
        #refineweek
      </span>
    </a>
  );
};
