import React from "react";

export const TwoTonedCloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="url(#b)"
        d="M14 7c0 .388-.044.766-.128 1.129A3.001 3.001 0 0 1 13 14H4a4 4 0 1 1 .1-7.999A5.002 5.002 0 0 1 14 7Z"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1="8"
        x2="8"
        y1="2"
        y2="14"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0080FF" stopOpacity=".15" />
        <stop offset="1" stopColor="#0080FF" stopOpacity=".4" />
      </linearGradient>
      <filter
        id="a"
        width="16"
        height="12"
        x="0"
        y="2"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.5 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend in2="shape" result="effect1_innerShadow_1308_15834" />
      </filter>
    </defs>
  </svg>
);
