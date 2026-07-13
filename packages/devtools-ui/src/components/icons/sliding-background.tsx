import React from "react";

export const SlidingBackground = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={56}
    viewBox="0 0 48 56"
    fill="none"
    {...props}
  >
    <g fillOpacity={0.1} clipPath="url(#sliding-background-clip)">
      <path
        fill="url(#sliding-background-gradient)"
        d="M8 0h8l-56 56h-8L8 0Z"
      />
      <path
        fill="url(#sliding-background-gradient)"
        d="M32 0h-8l-56 56h8L32 0Z"
      />
      <path
        fill="url(#sliding-background-gradient)"
        d="M40 0h8L-8 56h-8L40 0Z"
      />
      <path
        fill="url(#sliding-background-gradient)"
        d="M64 0h-8L0 56h8L64 0Z"
      />
      <path
        fill="url(#sliding-background-gradient)"
        d="M72 0h8L24 56h-8L72 0Z"
      />
      <path
        fill="url(#sliding-background-gradient)"
        d="M96 0h-8L32 56h8L96 0Z"
      />
    </g>
    <defs>
      <linearGradient
        id="sliding-background-gradient"
        x1={-190}
        x2={-190}
        y1={0}
        y2={56}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" stopOpacity={0} />
        <stop offset={0.5} stopColor="#currentColor" />
        <stop offset={1} stopColor="#currentColor" stopOpacity={0} />
      </linearGradient>
      <clipPath id="sliding-background-clip">
        <path fill="#fff" d="M0 0h48v56H0z" />
      </clipPath>
    </defs>
  </svg>
);
