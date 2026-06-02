import clsx from "clsx";
import React, { type FC } from "react";

type Props = { className?: string; title?: string };

export const BlogHero: FC<Props> = ({ className, title }) => {
  return (
    <h1
      className={clsx(
        "pl-8",
        "blog-max:pl-[46px]",
        "mt-[80px]",
        "blog-max:mt-[120px]",
        "text-[2.5rem]",
        "leading-[3rem]",
        "tracking-[-0.005em]",
        "font-semibold",
        "blog-sm:max-w-[592px]",
        "blog-md:max-w-[704px]",
        "blog-lg:max-w-[896px]",
        "blog-max:max-w-[1200px]",
        "w-full",
        "mx-auto",
        "relative",
        className,
      )}
    >
      {title || "Refine Blog"}
    </h1>
  );
};
