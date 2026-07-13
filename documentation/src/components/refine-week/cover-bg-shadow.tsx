import clsx from "clsx";
import React from "react";
import type { WeekVariants } from "./data";

type Props = {
  variant: WeekVariants;
};

export const CoverBgShadowMobile = ({ variant }: Props) => {
  return (
    <div
      className={clsx(
        "absolute top-[100px] sm:top-[200px] left-0 right-0 bottom-0 z-0",
        "w-full sm:w-[300px] h-[200px] sm:h-[375px] filter blur-[187px]",
        "mx-auto",
        {
          "bg-refine-week-supabase-cover-shadow": variant === "supabase",
          "bg-refine-week-strapi-cover-shadow": variant === "strapi",
        },
      )}
    />
  );
};

export const CoverBgShadowDesktop = ({ variant }: Props) => {
  return (
    <div
      className={clsx(
        "absolute top-[120px] right-[20px] bottom-0 z-0",
        "w-[450px] h-[400px] filter blur-[120px]",
        {
          "bg-refine-week-supabase-cover-shadow": variant === "supabase",
          "bg-refine-week-strapi-cover-shadow": variant === "strapi",
        },
      )}
    />
  );
};
