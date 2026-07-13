import React from "react";
import clsx from "clsx";
import type { WeekData, WeekVariants } from "./data";
import { RefineWeekLogo } from "@site/src/assets/week-of-refine/icons";
import { LetsStartButton } from "./lets-start-button";
import { TwitterButton } from "./twitter-button";
import { DayIndicator } from "./day-indicator";
import { CoverBgShadowDesktop } from "./cover-bg-shadow";
import { ShareIcon } from "@site/src/refine-theme/icons/share";
import PublishCountdown from "./publish-countdown";
import { CalendarIcon } from "@site/src/refine-theme/icons/calendar";

type Props = {
  variant: WeekVariants;
  data: WeekData;
  className?: string;
};

export const RefineWeekDesktop = ({ variant, data, className }: Props) => {
  const timelineRef = React.useRef<HTMLDivElement>(null);

  const { logo: Logo } = data;

  return (
    <div className={clsx("relative", "max-w-[944px]", "mx-auto", className)}>
      <CoverBgShadowDesktop variant={variant} />
      <div className={clsx("flex justify-between items-center", "py-20")}>
        <div className={clsx("flex items-center gap-4")}>
          <RefineWeekLogo />
          <span className={clsx("text-gray-500 dark:text-gray-400")}>with</span>
          <Logo />
        </div>
        <div
          className={clsx(
            "text-gray-500 dark:text-gray-400",
            "flex items-center gap-2",
          )}
        >
          <CalendarIcon />
          <span>{data.date}</span>
        </div>
      </div>

      <div className={clsx("flex gap-12")}>
        <div>
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
        </div>

        <img
          className={clsx(
            "p-0 my-0",
            "min-w-[464px] h-[296px]",
            "object-cover",
            "rounded-lg",
            "z-[1]",
          )}
          src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${data.cover}`}
          srcSet={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${data.cover2x}`}
          alt={data.coverAlt}
        />
      </div>

      <div
        ref={timelineRef}
        className={clsx(
          "text-center",
          "text-[32px] leading-[40px]",
          "text-gray-700 dark:text-gray-300",
          "mt-20",
          "font-bold",
        )}
      >
        Timeline
      </div>

      <div
        className={clsx(
          "flex flex-col justify-center items-center gap-10",
          "mt-10",
        )}
      >
        {data.timeline.map((item, index) => {
          return (
            <div key={index} className={clsx("relative")}>
              {item?.publishDate && (
                <PublishCountdown
                  className={clsx(
                    "absolute top-[-20px] left-1/2 transform -translate-x-1/2 z-[2]",
                  )}
                  publishDate={item.publishDate}
                />
              )}
              <div
                className={clsx(
                  "relative",
                  "w-full h-[272px]",
                  "p-10",
                  "flex justify-between items-center gap-10",
                  "rounded-2xl",
                  "bg-gray-50 dark:bg-gray-800",
                  {
                    "after:content-[''] after:absolute after:inset-0 after:left-[-75px] after:w-[120%] after:h-full after:bg-white after:dark:bg-gray-900 after:opacity-60":
                      !item?.link,
                    "bg-refine-week-supabase-timeline-item-bg-lg":
                      variant === "supabase",
                    "bg-refine-week-strapi-timeline-item-bg-lg":
                      variant === "strapi",
                  },
                )}
              >
                <DayIndicator
                  id={`desktop-${index}`}
                  variant={variant}
                  day={index + 1}
                  className={clsx("absolute top-[18px] left-[-56px] ")}
                />

                <div className={clsx("no-prose")}>
                  <div className={clsx("text-gray-600 dark:text-gray-400")}>
                    {item.date}
                  </div>
                  <div
                    className={clsx(
                      "text-gray-700 dark:text-gray-200",
                      "text-2xl font-bold",
                      "mt-2",
                    )}
                  >
                    {item.title}
                  </div>
                  <div
                    className={clsx("text-gray-600 dark:text-gray-400", "mt-2")}
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
                      "mt-10",
                      {
                        invisible: !item.link,
                      },
                    )}
                  >
                    <ShareIcon />
                    <span>Read article</span>
                  </a>
                </div>

                <img
                  className={clsx(
                    "z-[1]",
                    "p-0 m-0",
                    "min-w-[304px] h-[192px]",
                    "object-cover",
                    "rounded-[4px]",
                    { "opacity-50": !item?.link },
                  )}
                  src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${item.image}`}
                  srcSet={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static${item.image2x}`}
                  alt={item.title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
