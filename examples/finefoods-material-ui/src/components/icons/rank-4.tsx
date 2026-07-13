import type { SVGProps } from "react";

export const Rank4Icon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <title>4</title>
      <g filter="url(#rank-4-a)">
        <rect width={40} height={40} x={10} y={9} fill="#1E88E5" rx={20} />
        <path
          fill="#fff"
          d="M32.454 31.215v1.484H22.181v-1.064l6.367-9.854h1.475l-1.582 2.852-4.21 6.582h8.223Zm-1.982-9.434V36h-1.807V21.781h1.807Zm3.997 13.262c0-.306.095-.563.284-.771.195-.215.475-.323.84-.323.364 0 .64.108.83.323.195.208.293.465.293.771 0 .3-.098.553-.293.762-.19.208-.466.312-.83.312-.365 0-.645-.104-.84-.312a1.094 1.094 0 0 1-.284-.762Z"
        />
      </g>
      <defs>
        <filter
          id="rank-4-a"
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
            result="effect1_dropShadow_1413_832"
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
            in2="effect1_dropShadow_1413_832"
            result="effect2_dropShadow_1413_832"
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
            in2="effect2_dropShadow_1413_832"
            result="effect3_dropShadow_1413_832"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect3_dropShadow_1413_832"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
