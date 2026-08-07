import clsx from "clsx";
import React, { type FC } from "react";

type Props = { className?: string };

export const TemplatesHero: FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        "relative",
        "pt-3.5",
        "flex",
        "flex-col",
        "items-start landing-md:items-center landing-md:justify-center",
        "gap-6 landing-md:gap-6",
        "not-prose",
        "landing-md:mx-auto",
        "w-full",
        "landing-md:h-[328px]",
        "bg-[radial-gradient(50%_100%_at_50%_0%,#431407_0%,rgba(67,20,7,0)_100%)]",
        "before:absolute before:inset-0 before:bg-[url('/assets/hero-cubics.svg')] before:bg-cover before:bg-center  before:mix-blend-overlay before:pointer-events-none",
        className,
      )}
    >
      <div className={clsx("absolute", "top-0", "left-0")}>
        <GlowLeft />
      </div>
      <div className={clsx("absolute", "top-0", "right-0")}>
        <GlowRight />
      </div>
      <h1
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "gap-2",
          "font-semibold tracking-[-0.02em] text-[32px] leading-[40px] landing-sm:text-[56px] landing-sm:leading-[72px]",
        )}
      >
        <span className={clsx("text-gray-0")}>Refine </span>
        <span
          className={clsx(
            "font-bold font-jetBrains-mono",
            "text-orange-400 drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
          )}
        >
          CORE
        </span>
        <span className={clsx("text-gray-0")}>Templates </span>
      </h1>
      <p
        className={clsx(
          "font-normal",
          "tracking-[-0.0053rem]",
          "text-center",
          "max-w-[586px]",
          "text-zinc-300",
        )}
      >
        Explore a range of pre-designed Refine templates, perfect for everything
        from admin panels to dashboards and CRMs. Easily integrate these
        templates with your data sources and begin customizing to jumpstart your
        projects.
      </p>
    </div>
  );
};

const GlowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={724}
    height={475}
    viewBox="0 0 724 475"
    fill="none"
    className="pointer-events-none select-none"
  >
    <title>Glow Right</title>
    <g filter="url(#glow-right-a)" opacity={0.25}>
      <path
        fill="#FB923C"
        d="M125.345 354.976 120 349.024l37.329-37.284a283253234.865 283253234.865 0 0 0 709.256-708.383l80.175 89.286-41.071 33.117-739.273 596.1-41.071 33.116Z"
      />
    </g>
    <defs>
      <filter
        id="glow-right-a"
        width={1066.76}
        height={991.619}
        x={0}
        y={-516.643}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_5396_538"
          stdDeviation={60}
        />
      </filter>
    </defs>
  </svg>
);

const GlowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={724}
    height={475}
    viewBox="0 0 724 475"
    fill="none"
    className="pointer-events-none select-none"
  >
    <title>Glow Left</title>
    <g filter="url(#glow-left-a)" opacity={0.25}>
      <path
        fill="#FB923C"
        d="m598.328 354.976 5.344-5.952-37.329-37.284-671.926-671.1-37.329-37.283-80.176 89.286 41.071 33.117 739.274 596.1 41.071 33.116Z"
      />
    </g>
    <defs>
      <filter
        id="glow-left-a"
        width={1066.76}
        height={991.619}
        x={-343.088}
        y={-516.643}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_5396_507"
          stdDeviation={60}
        />
      </filter>
    </defs>
  </svg>
);
