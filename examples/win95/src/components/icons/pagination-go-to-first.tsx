import type { SVGProps } from "react";

export const IconPaginationGoToFirst = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill="none"
    {...props}
  >
    <title>{"go to first"}</title>
    <g fill="currentColor" filter="url(#pagination-go-to-first)">
      <path d="M3 .75H0v10.5h3V.75ZM7.5 5.25H6v1.5h1.5v1.5H9v1.5h1.5v1.5H12V.75h-1.5v1.5H9v1.5H7.5v1.5Z" />
    </g>
    <defs>
      <filter
        id="pagination-go-to-first"
        width={13.5}
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
          result="effect1_dropShadow_121_5139"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_121_5139"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
