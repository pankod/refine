import clsx from "clsx";
import React, { type FC } from "react";
import { LandingSectionCtaButton } from "./landing-section-cta-button";

type Props = {
  className?: string;
};

export const LandingAlreadyInvented: FC<Props> = ({ className }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(className)}>
      <div
        ref={ref}
        className={clsx(
          "not-prose",
          "flex-shrink-0",
          "h-full",
          "p-2 landing-sm:p-6",
          "rounded-xl",
          "bg-zinc-800",
        )}
      >
        <img
          src="https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/wheel-already-invented.png"
          className={clsx(
            "w-full",
            "h-auto",
            "landing-md:w-auto",
            "landing-md:h-[288px]",
            "landing-lg:h-[299px]",
            "landing-md:object-contain",
          )}
        />
        <div
          className={clsx(
            "not-prose",
            "mt-4 landing-sm:mt-6 landing-md:mt-4 landing-lg:mt-[26px]",
            "px-4 landing-sm:px-6",
          )}
        >
          <h6
            className={clsx(
              "p-0",
              "font-semibold",
              "text-base landing-sm:text-2xl",
              "text-white",
            )}
          >
            Wheel? Already invented.
          </h6>
          <div
            className={clsx(
              "not-prose",
              "flex",
              "items-center",
              "justify-between",
              "flex-wrap",
              "gap-4 landing-sm:gap-8",
              "mb-4 landing-sm:mb-6",
            )}
          >
            <p
              className={clsx(
                "h-auto landing-md:h-[72px] landing-lg:h-auto",
                "p-0",
                "mt-2 landing-sm:mt-4",
                "text-base",
                "text-zinc-300",
              )}
            >
              Start with a well-structured boilerplate, built around the
              industry’s best practices.
            </p>
            <LandingSectionCtaButton to="/core/docs">
              See documentation
            </LandingSectionCtaButton>
          </div>
        </div>
      </div>
    </div>
  );
};
