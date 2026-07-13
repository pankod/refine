import React, { type SVGProps } from "react";

export const LandingIntegrationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={31}
    height={31}
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_736_20221)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.4994 13.9754C12.0263 13.7248 14 11.5929 14 9C14 6.23858 11.7614 4 9 4C6.23858 4 4 6.23858 4 9C4 11.5929 5.97365 13.7248 8.5006 13.9754C8.50021 13.9835 8.5 13.9917 8.5 14L8.5 19.5C8.5 21.433 10.067 23 12 23H13.7929L12.6464 24.1464C12.4512 24.3417 12.4512 24.6583 12.6464 24.8536C12.8417 25.0488 13.1583 25.0488 13.3536 24.8536L15.3536 22.8536C15.5488 22.6583 15.5488 22.3417 15.3536 22.1464L13.3536 20.1464C13.1583 19.9512 12.8417 19.9512 12.6464 20.1464C12.4512 20.3417 12.4512 20.6583 12.6464 20.8536L13.7929 22H12C10.6193 22 9.5 20.8807 9.5 19.5L9.5 14C9.5 13.9917 9.49979 13.9835 9.4994 13.9754ZM13 9C13 11.2091 11.2091 13 9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9Z"
        fill="url(#paint0_linear_736_20221)"
        fillOpacity={0.75}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 22C17 19.4073 18.9733 17.2755 21.5 17.0247V12C21.5 10.6193 20.3807 9.5 19 9.5H17.2071L18.3536 10.6464C18.5488 10.8417 18.5488 11.1583 18.3536 11.3536C18.1583 11.5488 17.8417 11.5488 17.6464 11.3536L15.6464 9.35355C15.4512 9.15829 15.4512 8.84171 15.6464 8.64645L17.6464 6.64645C17.8417 6.45118 18.1583 6.45118 18.3536 6.64645C18.5488 6.84171 18.5488 7.15829 18.3536 7.35355L17.2071 8.5H19C20.933 8.5 22.5 10.067 22.5 12V17.0247C25.0267 17.2755 27 19.4073 27 22C27 24.7614 24.7614 27 22 27C19.2386 27 17 24.7614 17 22ZM26 22C26 24.2091 24.2091 26 22 26C19.7909 26 18 24.2091 18 22C18 19.7909 19.7909 18 22 18C24.2091 18 26 19.7909 26 22Z"
        fill="url(#paint1_linear_736_20221)"
        fillOpacity={0.75}
      />
    </g>
    <defs>
      <filter
        id="filter0_di_736_20221"
        x={0}
        y={0}
        width={31}
        height={31}
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
          result="effect1_dropShadow_736_20221"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_736_20221"
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
          result="effect2_innerShadow_736_20221"
        />
      </filter>
      <linearGradient
        id="paint0_linear_736_20221"
        x1={18.7857}
        y1={4}
        x2={18.7857}
        y2={20.4286}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0.75} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_736_20221"
        x1={18.7857}
        y1={4}
        x2={18.7857}
        y2={20.4286}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0.75} />
      </linearGradient>
    </defs>
  </svg>
);
