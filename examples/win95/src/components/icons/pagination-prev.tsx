import type { SVGProps } from "react";

export const IconPaginationPrev = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={13}
    fill="none"
    {...props}
  >
    <title>{"go to previous"}</title>
    <g filter="url(#pagination-prev)">
      <path
        fill="currentColor"
        d="M1.5 5.25H0v1.5h1.5v1.5H3v1.5h1.5v1.5H6V.75H4.5v1.5H3v1.5H1.5v1.5Z"
      />
    </g>
    <defs>
      <filter
        id="pagination-prev"
        width={7.5}
        height={12}
        x={0}
        y={0.75}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1.5} dy={1.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_121_5145"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_121_5145"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
