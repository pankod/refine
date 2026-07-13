import React, { type SVGProps } from "react";

export const LandingShareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 5.25a5.25 5.25 0 0 1-9.08 3.592l-4.498 2.25a5.285 5.285 0 0 1 0 1.817l4.499 2.25a5.25 5.25 0 1 1-1.342 2.683l-4.5-2.25a5.25 5.25 0 1 1 0-7.183l4.5-2.25A5.25 5.25 0 1 1 24 5.25Zm-18.75 9a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm15.75-9a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM18.75 21a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={12}
        y1={0}
        x2={12}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset={1} stopColor="#3FDCF7" stopOpacity={0.4} />
      </linearGradient>
    </defs>
  </svg>
);
