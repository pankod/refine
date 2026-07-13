import type { SVGProps } from "react";

export const Rank1Icon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <title>1</title>
      <g filter="url(#rank-1-a)">
        <rect
          width={40}
          height={40}
          x={10}
          y={9}
          fill="url(#rank-1-b)"
          rx={20}
        />
        <path
          fill="#000"
          d="M28.958 21.732V36h-2.353V24.525l-3.487 1.182v-1.943l5.557-2.032h.283Zm5.326 13.096c0-.364.124-.67.371-.918.248-.254.583-.38 1.006-.38.43 0 .765.126 1.006.38.247.248.37.554.37.918 0 .365-.123.67-.37.918-.241.247-.576.371-1.006.371-.423 0-.758-.123-1.006-.37a1.247 1.247 0 0 1-.371-.919Z"
        />
      </g>
      <defs>
        <linearGradient
          id="rank-1-b"
          x1={30}
          x2={30}
          y1={9}
          y2={49}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB300" />
          <stop offset={1} stopColor="#FDD835" />
        </linearGradient>
        <filter
          id="rank-1-a"
          width={60}
          height={60}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1413_808"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="effect1_dropShadow_1413_808"
            result="effect2_dropShadow_1413_808"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2.5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
          <feBlend
            in2="effect2_dropShadow_1413_808"
            result="effect3_dropShadow_1413_808"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect3_dropShadow_1413_808"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
