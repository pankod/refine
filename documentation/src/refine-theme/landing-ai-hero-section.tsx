import clsx from "clsx";
import React from "react";
import Link from "@docusaurus/Link";

export const LandingAiHeroSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "bg-[#C9D3E2]",
        "w-full",
        "px-6",
        "py-6",
        "landing-sm:px-10",
        "landing-sm:py-12",
        "relative",
        "z-[1]",
        "overflow-hidden",
        "rounded-3xl",
        "max-[375px]:rounded-none",
        "max-[375px]:w-screen",
        "max-[375px]:left-1/2",
        "max-[375px]:-translate-x-1/2",
        className,
      )}
    >
      <div className={clsx("relative", "z-[4]")}>
        <h2
          className={clsx(
            "text-2xl",
            "landing-sm:text-[32px]",
            "landing-sm:leading-10",
            "tracking-[-0.02em]",
            "text-gray-600",
          )}
        >
          The wait is over.
        </h2>
        <h2
          className={clsx(
            "text-[32px]",
            "leading-10",
            "landing-sm:text-[56px]",
            "landing-sm:leading-[72px]",
            "tracking-[-0.02em]",
            "font-bold",
            "text-gray-900",
          )}
        >
          Refine is here!
        </h2>

        <p className={clsx("max-w-[446px]", "text-gray-900", "mt-4")}>
          Instantly transform your APIs into enterprise-grade admin panels,
          dashboards & internal tools.
        </p>

        <div
          className={clsx(
            "flex",
            "items-center",
            "gap-10",
            "mt-6",
            "z-[4]",
            "relative",
          )}
        >
          <a
            href="https://refine.dev/"
            target="_blank"
            rel="noopener"
            className={clsx(
              "appearance-none",
              "bg-refine-indigo",
              "text-white",
              "hover:text-white",
              "no-underline",
              "px-5",
              "py-3",
              "rounded-[48px]",
              "z-[4]",
            )}
          >
            Start for free!
          </a>
          <Link
            to="/ai"
            className={clsx("text-refine-indigo", "underline", "z-[4]")}
          >
            Learn more
          </Link>
        </div>
      </div>

      <div className={clsx("absolute", "inset-0", "bg-noise", "z-[2]")} />

      <video
        className={clsx(
          "z-[1]",
          "absolute",
          "inset-0",
          "w-full",
          "h-full",
          "object-cover",
        )}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        controls={false}
        preload="auto"
      >
        <source
          type="video/mp4"
          src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-banner-bg-video.mp4"
        />
      </video>

      <video
        className={clsx(
          "hidden",
          "landing-md:block",
          "z-[3]",
          "absolute",
          "w-[50px]",
          "h-[50px]",
          "top-[100px]",
          "right-[166px]",
          "landing-lg:top-[100px]",
          "landing-lg:right-[320px]",
          "rounded-full",
          "object-cover",
          "object-right",
        )}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        controls={false}
        preload="auto"
      >
        <source
          type="video/mp4"
          src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-banner-logo-ball.mp4"
        />
      </video>

      <img
        src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-banner-logo.png"
        alt="Refine Banner Logo"
        className={clsx(
          "hidden",
          "landing-md:block",
          "absolute",
          "inset-0",
          "w-full",
          "h-full",
          "object-cover",
          "z-[2]",
        )}
        loading="eager"
      />
    </div>
  );
};
