import clsx from "clsx";
import React from "react";

export const YCombinatorCircleIcon = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) => (
  <div
    className={clsx(
      "w-full h-full",
      "flex justify-center items-center",
      "rounded-full",
      "bg-[#F05F22]",
    )}
    {...props}
  >
    <span className={clsx("text-[64px] md:text-[96px] text-white")}>Y</span>
  </div>
);
