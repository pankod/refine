import clsx from "clsx";
import React, { type FC, useMemo } from "react";
import { useCommunityStatsContext } from "../context/CommunityStats";

type Props = {
  className?: string;
};

export const LandingCommunity: FC<Props> = ({ className }) => {
  const { githubStarCountText } = useCommunityStatsContext();

  const list = useMemo(() => {
    return [
      {
        stat: githubStarCountText,
        description: "Stars on GitHub",
        href: "https://github.com/refinedev/refine",
      },
      {
        stat: "8K+",
        description: "Projects on production, including large enterprises",
      },
      {
        stat: "32K+",
        description: "Active developers in our open-source community",
      },
      {
        stat: "200K+",
        description: "End users are using apps built with Refine",
      },
    ];
  }, [githubStarCountText]);

  return (
    <div className={clsx(className, "w-full")}>
      <div className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}>
        <h2
          className={clsx(
            "text-2xl landing-sm:text-[32px]",
            "tracking-normal",
            "text-start",
            "p-0",
            "text-white",
          )}
        >
          Feel the power of a{" "}
          <span className={clsx("font-semibold", "text-orange-400")}>
            great community
          </span>
          .
        </h2>
      </div>

      <div
        className={clsx(
          "mt-8 landing-sm:mt-12",
          "grid",
          "grid-cols-1 landing-sm:grid-cols-2 landing-lg:grid-cols-4",
          "gap-4 landing-sm:gap-1",
        )}
      >
        {list.map((item, index) => {
          const Wrapper = item.href ? "a" : "div";
          return (
            <Wrapper
              key={index}
              {...(item.href
                ? {
                    href: item.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
              className={clsx(
                "not-prose",
                "p-4 landing-sm:px-10 landing-sm:py-4",
                "flex",
                "flex-col",
                "gap-4",
                "bg-zinc-800",
                "rounded-xl",
                item.href && "cursor-pointer hover:brightness-95",
              )}
            >
              <div
                className={clsx(
                  "text-4xl landing-sm:text-5xl",
                  "font-bold",
                  "text-white",
                )}
              >
                {item.stat}
              </div>
              <div
                className={clsx(
                  "text-sm landing-sm:text-base",
                  "text-zinc-300",
                )}
              >
                {item.description}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
};
