import React from "react";

export const OrangeStarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g filter="url(#orange-star-a)">
      <path
        stroke="url(#orange-star-b)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="m8 1.333 2.06 4.174 4.607.673-3.334 3.247.787 4.586L8 11.847l-4.12 2.166.787-4.586L1.333 6.18l4.607-.673L8 1.333Z"
      />
    </g>
    <defs>
      <linearGradient
        id="orange-star-b"
        x1={8}
        x2={8}
        y1={1.333}
        y2={14.013}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FDBA74" />
        <stop offset={1} stopColor="#F97316" />
      </linearGradient>
      <filter
        id="orange-star-a"
        width={14.667}
        height={14.413}
        x={0.667}
        y={0.667}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={0.4} />
        <feColorMatrix values="0 0 0 0 0.0941176 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_5215_117"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_5215_117"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
