import clsx from "clsx";
import React from "react";
import { LandingStartActionIcon } from "./icons/landing-start-action";
import { LandingHeroGithubStars } from "./landing-hero-github-stars";

import Link from "@docusaurus/Link";
import { LandingCopyCommandButton } from "./landing-copy-command-button";
import { LandingHeroShowcaseSection } from "./landing-hero-showcase-section";

export const LandingHeroSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "w-full",
        "gap-4",
        "landing-sm:gap-12",
        "landing-md:gap-[59px]",
        "landing-lg:gap-20",
        className,
      )}
    >
      <div
        className={clsx(
          "px-2 landing-sm:px-0",
          "flex",
          "flex",
          "w-full",
          "relative",
          "min-h-[360px]",
          "landing-lg:min-h-[480px]",
          "py-4",
        )}
      >
        <div
          className={clsx(
            "landing-sm:pl-10",
            "flex",
            "flex-col",
            "justify-center",
            "gap-6",
            "z-[1]",
            "landing-lg:justify-start",
            "landing-lg:py-8",
          )}
        >
          <LandingHeroGithubStars />
          <div className={clsx("flex", "flex-col", "gap-6")}>
            <h1
              className={clsx(
                "text-[32px] leading-[40px]",
                "tracking-[-0.5%]",
                "landing-sm:text-[56px] landing-sm:leading-[72px]",
                "landing-sm:max-w-[588px]",
                "landing-sm:tracking-[-0.06rem]",
                "font-semibold",
                "text-gray-0",
              )}
            >
              Open-source Retool for Enterprise
            </h1>
            <p
              className={clsx(
                "font-normal",
                "text-base",
                "text-gray-300",
                "landing-xs:max-w-[388px]",
              )}
            >
              Build React-based internal tools, admin panels, dashboards & B2B
              apps with unmatched flexibility.
            </p>
          </div>
          <div
            className={clsx(
              "flex",
              "items-center",
              "justify-start",
              "gap-4",
              "landing-lg:mt-7",
            )}
          >
            <Link
              to="/core/docs"
              className={clsx(
                "self-start",
                "rounded-lg",
                "!text-white",
                "bg-orange-500",
                "transition-[filter]",
                "duration-150",
                "ease-in-out",
                "hover:brightness-110",
                "py-3",
                "pl-3 pr-6",
                "flex",
                "items-center",
                "justify-center",
                "gap-2",
                "hover:!no-underline",
              )}
            >
              <LandingStartActionIcon />
              <span className={clsx("text-base", "font-semibold")}>
                See Docs
              </span>
            </Link>
            <LandingCopyCommandButton
              className={clsx("hidden", "landing-sm:block")}
            />
          </div>
        </div>
        <div
          className={clsx(
            "hidden landing-lg:block",
            "absolute",
            "top-0",
            "right-0",
          )}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            width={690}
            src="https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/refine-core-hero.mp4"
          />
        </div>
      </div>
      <LandingHeroShowcaseSection />
    </div>
  );
};
