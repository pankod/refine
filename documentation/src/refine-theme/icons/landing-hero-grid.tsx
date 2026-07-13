import clsx from "clsx";
import React from "react";

const BgGridMask = React.memo(function GridMask() {
  return (
    <g mask="url(#bgMask)" className="heroAnimationBG">
      {Array.from({ length: 19 })
        .fill(null)
        .map((_, i) => {
          return Array.from({ length: 14 })
            .fill(null)
            .map((_, j) => {
              return (
                <rect
                  key={`${i}-${j}`}
                  id={`hero-animation-grid-${i}-${j}`}
                  x={10 + 36 * i}
                  y={17 + 36 * j}
                  width="36"
                  height="36"
                  fill="none"
                  className={clsx("stroke-[#EAEFF4] dark:stroke-[#26283D]")}
                />
              );
            });
        })}
    </g>
  );
});

export const LandingHeroGridSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="704"
    height="536"
    viewBox="0 0 704 536"
    fill="none"
    {...props}
    className={clsx(
      "bg-gray-50 dark:bg-gray-800",
      "dark:bg-noise",
      "duration-150",
      "ease-in-out",
      "transition-colors",
      "rounded-3xl",
      props.className,
    )}
  >
    <BgGridMask />
    <mask
      id="bgMask"
      width="704"
      height="536"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="url(#maskGradient)" d="M0 0h704v536H0z" />
    </mask>
    <defs>
      <g className="defBase">
        <radialGradient
          id="maskGradient"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -268 352 0 352 268)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".475" stopColor="#303450" />
          <stop offset="1" stopColor="#303450" stopOpacity="0" />
        </radialGradient>
      </g>
    </defs>
  </svg>
);
