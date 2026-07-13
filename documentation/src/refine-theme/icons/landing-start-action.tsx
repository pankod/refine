import React from "react";

export const LandingStartActionIcon = (
  props: React.SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="url(#start-action-a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6 3 14 9-14 9V3Z"
    />
    <defs>
      <linearGradient
        id="start-action-a"
        x1={13}
        x2={13}
        y1={3}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#DBEAFE" />
      </linearGradient>
    </defs>
  </svg>
);
