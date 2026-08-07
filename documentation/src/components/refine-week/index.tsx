import React from "react";
import clsx from "clsx";
import { additionalSources, data as weekData } from "./data";
import { RefineWeekDesktop } from "./refine-week-desktop";
import { RefineWeekMobile } from "./refine-week-mobile";
import { Tweet } from "react-twitter-widgets";

type Props = {
  variant: "strapi" | "supabase";
};

export const RefineWeek = ({ variant }: Props) => {
  return (
    <div className={clsx("pb-20", "overflow-hidden")}>
      <RefineWeekDesktop
        className={clsx("hidden lg:block")}
        variant={variant}
        data={weekData[variant]}
      />
      <RefineWeekMobile
        className={clsx("block lg:hidden")}
        variant={variant}
        data={weekData[variant]}
      />

      <div className={clsx("max-w-[620px] lg:max-w-[944px] ", "mx-auto mt-20")}>
        <div
          className={clsx(
            "max-w-[344px] sm:max-w-[620px] lg:max-w-[944px] mx-auto",
            "text-start lg:text-center",
            "text-[32px] leading-[40px] font-bold",
            "text-gray-700 dark:text-gray-300",
          )}
        >
          Additional Sources
        </div>

        <div
          className={clsx(
            "no-prose",
            "flex flex-wrap gap-4 justify-center items-center",
            "mt-6 lg:mt-10",
          )}
        >
          {additionalSources.map((item) => {
            return (
              <a
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener"
                className={clsx(
                  "no-underline",
                  "flex items-start gap-4",
                  "w-[160px] sm:w-[192px]",
                  "p-4",
                  "rounded-2xl",
                  "border border-gray-200 dark:border-gray-700",
                  "text-xs sm:text-base",
                )}
              >
                <div className={clsx("mt-[2px]")}>{item.icon}</div>
                <div className={"flex flex-col"}>
                  <div className={clsx("text-gray-500 dark:text-gray-400")}>
                    {item.title}
                  </div>
                  <div
                    className={clsx(
                      "text-gray-900 dark:text-gray-0",
                      "font-semibold",
                    )}
                  >
                    {item.label}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div
          className={clsx(
            "hidden lg:block",
            "mt-20",
            "text-start lg:text-center",
            "text-[32px] leading-[40px]",
            "text-gray-700 dark:text-gray-300",
          )}
        >
          #refineweek
        </div>

        <div className="mx-6 mt-8 hidden lg:grid min-w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {weekData[variant].tweetIDList.map((id) => {
            return (
              <div key={id} className="w-full">
                <Tweet tweetId={id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
