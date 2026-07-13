import type { SVGProps } from "react";

export const Rank2Icon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <title>2</title>
      <g filter="url(#rank-2-a)">
        <rect
          width={40}
          height={40}
          x={10}
          y={9}
          fill="url(#rank-2-b)"
          rx={20}
        />
        <path
          fill="#000"
          d="M32.064 34.125V36h-9.532v-1.611l4.63-5.05c.507-.572.908-1.067 1.2-1.483.294-.417.498-.792.616-1.124.123-.338.185-.667.185-.986 0-.45-.084-.843-.254-1.181a1.858 1.858 0 0 0-.722-.811c-.32-.202-.707-.303-1.162-.303-.528 0-.97.114-1.328.342a2.136 2.136 0 0 0-.811.947c-.182.397-.273.853-.273 1.367h-2.354c0-.826.189-1.582.566-2.265a4.143 4.143 0 0 1 1.641-1.64c.716-.411 1.579-.616 2.588-.616.95 0 1.758.16 2.422.479.664.319 1.168.77 1.514 1.357.351.586.527 1.28.527 2.08 0 .443-.072.882-.215 1.318a6.248 6.248 0 0 1-.615 1.309c-.26.43-.57.862-.928 1.299-.358.43-.752.866-1.182 1.308l-3.076 3.389h6.563Zm2.22.703c0-.364.124-.67.371-.918.248-.254.583-.38 1.006-.38.43 0 .765.126 1.006.38.247.248.37.554.37.918 0 .365-.123.67-.37.918-.241.247-.576.371-1.006.371-.423 0-.758-.123-1.006-.37a1.247 1.247 0 0 1-.371-.919Z"
        />
      </g>
      <defs>
        <linearGradient
          id="rank-2-b"
          x1={30}
          x2={30}
          y1={9}
          y2={49}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CFD8DC" />
          <stop offset={1} stopColor="#ECEFF1" />
        </linearGradient>
        <filter
          id="rank-2-a"
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
            result="effect1_dropShadow_1413_816"
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
            in2="effect1_dropShadow_1413_816"
            result="effect2_dropShadow_1413_816"
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
            in2="effect2_dropShadow_1413_816"
            result="effect3_dropShadow_1413_816"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect3_dropShadow_1413_816"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
