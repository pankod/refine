import React, { type SVGProps } from "react";

export const RefineLogoSeal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <g opacity={0.5}>
      <path
        fill="url(#a)"
        fillRule="evenodd"
        d="M20.834 10a3.5 3.5 0 1 0-7 0v14a3.5 3.5 0 1 0 7 0V10Zm-3.5 2.666a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#b)"
        fillRule="evenodd"
        d="M33 17c0 8.837-7.163 16-16 16S1 25.837 1 17 8.163 1 17 1s16 7.163 16 16ZM17.334 5a5 5 0 0 0-5 5v14a5 5 0 0 0 10 0V10a5 5 0 0 0-5-5Z"
        clipRule="evenodd"
      />
      <path
        stroke="url(#c)"
        strokeOpacity={0.15}
        d="M21.334 10a4 4 0 0 0-8 0v14a4 4 0 1 0 8 0V10ZM19.5 10a2.167 2.167 0 1 1-4.333 0 2.167 2.167 0 0 1 4.333 0ZM17 33.5c9.113 0 16.5-7.387 16.5-16.5S26.113.5 17 .5.5 7.887.5 17 7.887 33.5 17 33.5ZM12.834 10a4.5 4.5 0 1 1 9 0v14a4.5 4.5 0 1 1-9 0V10Z"
      />
    </g>
    <defs>
      <linearGradient
        id="a"
        x1={17}
        x2={17}
        y1={1}
        y2={33}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#14141F" />
        <stop offset={1} stopColor="#14141F" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient
        id="b"
        x1={17}
        x2={17}
        y1={1}
        y2={33}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#14141F" />
        <stop offset={1} stopColor="#14141F" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient
        id="c"
        x1={17}
        x2={17}
        y1={1}
        y2={33}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
    </defs>
  </svg>
);
