import type { SVGProps } from "react";

export const HrLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={49}
    height={48}
    fill="none"
    {...props}
  >
    <g fill="#0D9488" fillRule="evenodd" clipRule="evenodd" filter="url(#a)">
      <path d="M26.5 23.994C26.497 10.742 18.44 0 8.5 0a8 8 0 0 0-8 8c0 9.941 10.745 18 24 18a2 2 0 0 0 2-2v-.006ZM41.5 6c-7.18 0-13 8.059-13 18a2 2 0 0 0 2 2c9.941 0 18-5.82 18-13a7 7 0 0 0-7-7ZM26.5 30c0 9.941-6.268 18-14 18a6 6 0 0 1-6-6c0-7.732 8.059-14 18-14a2 2 0 0 1 2 2ZM28.5 30a2 2 0 0 1 2-2c7.732 0 14 4.925 14 11a5 5 0 0 1-5 5c-6.075 0-11-6.268-11-14Z" />
    </g>
    <defs>
      <filter
        id="a"
        width={48}
        height={49}
        x={0.5}
        y={-1}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-2} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
        <feBlend
          in2="shape"
          mode="overlay"
          result="effect1_innerShadow_4377_59201"
        />
      </filter>
    </defs>
  </svg>
);
