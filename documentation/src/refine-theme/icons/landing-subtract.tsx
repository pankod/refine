import React, { type SVGProps } from "react";

export const LandingSubtractIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={16}
    viewBox="0 0 25 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 .5a7.5 7.5 0 0 0 0 15h9a7.5 7.5 0 0 0 0-15H8Zm0 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={12.5}
        y1={0.5}
        x2={12.5}
        y2={15.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset={1} stopColor="#3FDCF7" stopOpacity={0.4} />
      </linearGradient>
    </defs>
  </svg>
);
