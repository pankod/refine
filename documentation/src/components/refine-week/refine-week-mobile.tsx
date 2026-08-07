import React from "react";
import clsx from "clsx";
import type { WeekData, WeekVariants } from "./data";
import { RefineWeekLogo } from "@site/src/assets/week-of-refine/icons";
import { LetsStartButton } from "./lets-start-button";
import { TwitterButton } from "./twitter-button";
import { DayIndicator } from "./day-indicator";
import { ShareIcon } from "@site/src/refine-theme/icons/share";
import { CoverBgShadowMobile } from "./cover-bg-shadow";
import { CalendarIcon } from "@site/src/refine-theme/icons/calendar";

type Props = {
  variant: WeekVariants;
  data: WeekData;
  className?: string;
};

export const RefineWeekMobile = ({ variant, data, className }: Props) => {
  const timelineRef = React.useRef<HTMLDivElement>(null);

  const { logo: Logo } = data;

  return (
    <div className={clsx("relative", className)}>
      <CoverBgShadowMobile variant={variant} />
      <div
        className={clsx(
          "flex justify-center sm:justify-start items-center gap-4",
          "sm:max-w-[620px] mx-auto",
          "py-10 sm:py-20",
        )}
      >
        <RefineWeekLogo />
        <span className={clsx("text-gray-500 dark:text-gray-400")}>with</span>
        <Logo />
      </div>

      <div
        className={clsx(
          "no-prose",
          "flex items-center justify-center",
          "z-[1]",
        )}
      >
        <img
          className={clsx(
            "p-0 my-0",
            "h-[210px] sm:h-[396px]",
            "object-cover",
            "rounded-[4px]",
            "z-[1]",
          )}
          src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${data.cover}`}
          srcSet={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${data.cover2x}`}
          alt={data.coverAlt}
        />
      </div>

      <div
        className={clsx("max-w-[328px] sm:max-w-[620px]", "mx-auto", "z-[1]")}
      >
        <div
          className={clsx(
            "text-gray-500 dark:text-gray-400",
            "mt-6 sm:mt-20",
            "flex items-center gap-2",
          )}
        >
          <CalendarIcon />
          <span>{data.date}</span>
        </div>

        <div
          className={clsx(
            "text-[32px] leading-[40px]",
            "text-gray-800 dark:text-gray-100",
            "mt-10",
          )}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        <div
          className={clsx(
            "flex justify-between sm:justify-start items-center sm:gap-12",
            "mt-10",
          )}
        >
          <LetsStartButton
            onClick={() => {
              timelineRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
            }}
          />
          <TwitterButton href={data.shareTweetUrl} />
        </div>

        <div
          ref={timelineRef}
          className={clsx(
            "text-[32px] leading-[40px]",
            "text-gray-700 dark:text-gray-300",
            "mt-20",
            "font-bold",
          )}
        >
          Timeline
        </div>
      </div>

      <div
        className={clsx(
          "max-w-[360px] sm:max-w-[620px] mx-auto",
          "flex flex-col gap-10",
          "mt-10",
        )}
      >
        {data.timeline.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "relative",
                "bg-gray-50 dark:bg-gray-800",
                "rounded-lg",
              )}
            >
              <DayIndicator
                id={`mobile-${index}`}
                variant={variant}
                day={index + 1}
                className={clsx(
                  "absolute top-[-8px] left-[-8px] sm:top-[-16px] sm:left-[-16px]",
                )}
              />
              <div
                className={clsx(
                  "text-gray-600 dark:text-gray-400",
                  "h-14",
                  "ml-24 pt-2",
                )}
              >
                {item.date}
              </div>

              <div className={clsx("flex flex-col gap-6", "pb-10", "no-prose")}>
                <div
                  className={clsx(
                    "text-gray-700 dark:text-gray-200",
                    "text-2xl font-bold",
                    "mt-6",
                    "px-4",
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={clsx(
                    "no-prose",
                    "relative",
                    "flex items-center justify-center",
                    "relative",
                  )}
                >
                  <div
                    className={clsx(
                      "absolute top-0 left-0 z-0",
                      "w-full h-full",
                      {
                        "bg-refine-week-supabase-timeline-item-bg":
                          variant === "supabase",
                        "bg-refine-week-strapi-timeline-item-bg":
                          variant === "strapi",
                      },
                    )}
                  />
                  <img
                    className={clsx(
                      "z-[1]",
                      "p-0 m-0",
                      "h-[208px] sm:h-[365px]",
                      "object-cover",
                      "rounded-[4px]",
                    )}
                    src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${item.image}`}
                    srcSet={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${item.image2x}`}
                    alt={item.title}
                  />
                </div>
                <div
                  className={clsx("px-4", "text-gray-600 dark:text-gray-400")}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                />
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  className={clsx(
                    "no-underline",
                    "flex items-center gap-2",
                    "px-4",
                  )}
                >
                  <ShareIcon />
                  <span>Read article</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
