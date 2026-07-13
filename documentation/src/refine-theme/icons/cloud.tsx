import React from "react";

export const CloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_i_736_19454)">
      <path
        d="M14 7C14 7.38818 13.9558 7.76599 13.8721 8.12872C15.1036 8.50226 16 9.64642 16 11C16 12.6569 14.6569 14 13 14H4C1.79086 14 0 12.2092 0 10C0 7.79083 1.79086 6 4 6C4.03336 6 4.06659 6.00043 4.09976 6.00122C4.56256 3.71838 6.58063 2 9 2C11.7614 2 14 4.23859 14 7Z"
        fill="url(#paint0_linear_736_19454)"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_736_19454"
        x="0"
        y="2"
        width="16"
        height="12"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_736_19454"
        />
      </filter>
      <linearGradient
        id="paint0_linear_736_19454"
        x1="8"
        y1="2"
        x2="8"
        y2="14"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.66" />
        <stop offset="1" stopColor="white" stopOpacity="0.33" />
      </linearGradient>
    </defs>
  </svg>
);
