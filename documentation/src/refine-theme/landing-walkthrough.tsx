import React from "react";
import clsx from "clsx";
import { LandingWalkthroughVideo } from "./landing-walkthrough-video";
import { LandingMagic } from "./landing-magic";

export const LandingWalkthrough = () => {
  return (
    <>
      <div
        className={clsx(
          "w-full",
          "relative",
          "pb-12",
          "max-w-screen-landing-2xl",
          "mx-auto",
          "hidden landing-lg:block",
        )}
      >
        <div
          className={clsx(
            "w-full h-full",
            "flex items-center justify-center",
            "absolute",
            "left-0 top-0",
          )}
        >
          <div
            className={clsx(
              "w-full",
              "h-[75px]",
              "bg-[#4D4DB2]",
              "blur-[100px]",
              "opacity-50",
              "mb-[75px]",
            )}
          />
        </div>
        <div
          className={clsx(
            "w-full",
            "max-w-screen-landing-content",
            "px-4 landing-sm:px-5 landing-md:px-6 landing-lg:px-8 landing-xl:px-0",
            "flex flex-col",
            "gap-12",
            "mx-auto",
            "mb-16",
            "relative",
          )}
        >
          <div
            className={clsx(
              "bg-landing-text-bg",
              "bg-clip-text",
              "text-transparent",
              "text-[1.5rem]",
              "leading-[2rem]",
              "landing-md:text-[2rem]",
              "landing-md:leading-[2.5rem]",
              "landing-lg:text-[2.5rem]",
              "landing-lg:leading-[3rem]",
              "text-center",
            )}
          >
            <span className="font-semibold">Flexibility </span>
            <span className="font-light">without starting from scratch</span>
          </div>
          <LandingWalkthroughVideo />
        </div>
      </div>
      <LandingMagic />
    </>
  );
};
