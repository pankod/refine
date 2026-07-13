import React, { type SVGProps } from "react";

export const LandingFeatherIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={28}
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_736_20208)">
      <path
        d="M4.5 4.5C6.84033 9 12.5 16.5 19.8333 19.8965M27.5 22.7834C25.5403 23.7673 21.4967 23.7854 17.5 22.5416C17.1926 22.4459 17 21 16 20.5C16 20.5 15.857 21.9592 15.5 21.8066C13.6738 21.0259 11.9354 19.9607 10.5 18.581C10.1213 18.217 10 15 10 15C10 15 8.78183 16.5705 8.5 16.1092C7.22639 14.0242 6.56444 11.4552 6.89587 8.34913C11.1055 8.34913 14.6089 10.0899 17.5 12.3678C17.9636 12.733 16.5 13.5 16.5 13.5C18 14 19.5643 14.1623 19.9083 14.5C23.5511 18.0758 25.9888 22.0247 27.5 22.7834Z"
        stroke="url(#paint0_linear_736_20208)"
        strokeOpacity={0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_736_20208"
        x={0}
        y={0}
        width={32}
        height={28}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_736_20208"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_736_20208"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.5} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_736_20208"
        />
      </filter>
      <linearGradient
        id="paint0_linear_736_20208"
        x1={19.2857}
        y1={4.5}
        x2={19.2857}
        y2={18.0714}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0.75} />
      </linearGradient>
    </defs>
  </svg>
);
