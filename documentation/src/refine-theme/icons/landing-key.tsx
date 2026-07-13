import React, { type SVGProps } from "react";

export const LandingKeyIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.126 1.19a4.065 4.065 0 0 0-5.75 0L7.194 5.375a4.065 4.065 0 0 0 0 5.75l.592.591L.439 19.06A1.5 1.5 0 0 0 0 20.121V22.5A1.5 1.5 0 0 0 1.5 24H3.88a1.5 1.5 0 0 0 1.06-.44l7.346-7.345.592.592a4.065 4.065 0 0 0 5.749 0l4.183-4.183a4.065 4.065 0 0 0 0-5.75l-5.683-5.683ZM15.75 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
      fill="url(#key-a)"
    />
    <defs>
      <linearGradient
        id="key-a"
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
