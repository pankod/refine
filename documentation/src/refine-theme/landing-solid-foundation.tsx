import clsx from "clsx";
import React from "react";
import type { FC } from "react";

type Props = {
  className?: string;
};

export const LandingSolidFoundation: FC<Props> = (props) => {
  return (
    <>
      <LandingSolidFoundationDesktop
        {...props}
        className={clsx("hidden", "landing-lg:block")}
      />
      <LandingSolidFoundationMobile
        {...props}
        className={clsx("block", "landing-lg:hidden")}
      />
    </>
  );
};

export const LandingSolidFoundationDesktop: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(className, "w-full")}>
      <div
        className={clsx(
          "not-prose",
          "relative",
          "w-full",
          "h-[400px]",
          "px-10",
          "bg-zinc-800",
          "rounded-2xl landing-sm:rounded-3xl",
          "flex",
          "flex-col landing-lg:flex-row",
          "landing-lg:items-center",
          "gap-8 landing-lg:gap-12",
          "overflow-hidden",
        )}
      >
        <div className={clsx("flex", "flex-col", "gap-4", "flex-shrink-0")}>
          <h2
            className={clsx(
              "text-[2rem]",
              "leading-10",
              "font-medium",
              "text-white",
              "p-0",
              "m-0",
            )}
          >
            Built on a solid foundation
          </h2>
          <p
            className={clsx(
              "text-base",
              "leading-6",
              "font-normal",
              "tracking-[-0.004em]",
              "text-zinc-300",
              "max-w-[446px]",
              "p-0",
              "m-0",
            )}
          >
            Refine{" "}
            <span
              className={clsx(
                "font-jetBrains-mono",
                "text-orange-400 drop-shadow-none",
              )}
            >
              CORE
            </span>{" "}
            is backed by{" "}
            <span className={clsx("text-white")}>Y Combinator</span> (YC S23),{" "}
            <span className={clsx("text-white")}>500 Emerging Europe</span> and{" "}
            <span className={clsx("text-white")}>Senovo</span>.
          </p>
        </div>
        <div
          className={clsx("flex-1", "flex", "items-center", "justify-center")}
        >
          <img
            src="https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/build-on-a-solid-foundation.png"
            alt="Built on a solid foundation"
            width={536}
            height={336}
            className={clsx("max-w-full", "h-auto")}
          />
        </div>
      </div>
    </div>
  );
};

export const LandingSolidFoundationMobile: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(className, "w-full")}>
      <div className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}>
        <h2
          className={clsx(
            "text-2xl landing-sm:text-[32px]",
            "tracking-normal",
            "text-start",
            "font-medium",
            "p-0",
            "text-white",
          )}
        >
          Built on a solid foundation
        </h2>
        <p
          className={clsx(
            "mt-4 landing-sm:mt-6",
            "max-w-md",
            "text-base",
            "tracking-[-0.004em]",
            "text-zinc-300",
          )}
        >
          Refine{" "}
          <span className={clsx("font-jetBrains-mono", "text-orange-400")}>
            CORE
          </span>{" "}
          is backed by <span className={clsx("text-white")}>Y Combinator</span>{" "}
          (YC S23),{" "}
          <span className={clsx("text-white")}>500 Emerging Europe</span> and{" "}
          <span className={clsx("text-white")}>Senovo</span>.
        </p>
      </div>
      <div
        className={clsx(
          "mt-12",
          "rounded-3xl",
          "flex",
          "items-center",
          "justify-center",
          "h-[400px]",
          "bg-zinc-800",
        )}
      >
        <img
          src="https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/build-on-a-solid-foundation.png"
          alt="Built on a solid foundation"
          width={536}
          height={336}
          className={clsx("max-w-full", "h-auto")}
        />
      </div>
    </div>
  );
};
