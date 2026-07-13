import type { SVGProps } from "react";
import { useConfigProvider } from "../../context";

export const Rank1Icon = (props: SVGProps<SVGSVGElement>) => {
  const { mode } = useConfigProvider();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      {...props}
    >
      <path
        fill="url(#rank-1-a)"
        stroke={mode === "dark" ? "#000" : "#fff"}
        strokeWidth={3}
        d="M26.652 2.362a8.166 8.166 0 0 0-7.304 0L6.014 9.03A8.167 8.167 0 0 0 1.5 16.333v13.334a8.167 8.167 0 0 0 4.514 7.304l13.334 6.667a8.166 8.166 0 0 0 7.304 0l13.334-6.667a8.167 8.167 0 0 0 4.514-7.304V16.333a8.167 8.167 0 0 0-4.514-7.304L26.652 2.362Z"
      />
      <path
        fill="url(#rank-1-b)"
        stroke="url(#rank-1-c)"
        d="M23.969 7.729a2.167 2.167 0 0 0-1.938 0L8.698 14.395A2.167 2.167 0 0 0 7.5 16.333v13.334c0 .82.464 1.57 1.198 1.938L22.03 38.27c.61.305 1.328.305 1.938 0l13.333-6.666a2.167 2.167 0 0 0 1.198-1.938V16.333c0-.82-.464-1.57-1.198-1.938L23.97 7.73ZM20.242 4.15a6.167 6.167 0 0 1 5.516 0l13.333 6.667a6.167 6.167 0 0 1 3.409 5.515v13.334a6.167 6.167 0 0 1-3.409 5.515L25.758 41.85a6.167 6.167 0 0 1-5.516 0L6.91 35.182A6.167 6.167 0 0 1 3.5 29.667V16.333a6.167 6.167 0 0 1 3.409-5.515L20.242 4.15Z"
      />
      <g filter="url(#rank-1-d)">
        <path
          fill="#874D00"
          d="M19.914 30V19.053h-.068l-3.526 2.363V18.35l3.584-2.442h3.575V30h-3.565Zm8.018.186a1.82 1.82 0 0 1-1.826-1.836c0-1.016.81-1.827 1.826-1.827a1.82 1.82 0 0 1 1.836 1.827c0 1.025-.811 1.835-1.836 1.835Z"
        />
      </g>
      <defs>
        <radialGradient
          id="rank-1-a"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 40 -40 0 23 3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF1B8" />
          <stop offset={1} stopColor="#FFC53D" />
        </radialGradient>
        <radialGradient
          id="rank-1-b"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 40 -40 0 23 3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC53D" />
          <stop offset={1} stopColor="#FAAD14" />
        </radialGradient>
        <linearGradient
          id="rank-1-c"
          x1={23}
          x2={23}
          y1={3}
          y2={43}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD666" />
          <stop offset={1} stopColor="#D48806" />
        </linearGradient>
        <filter
          id="rank-1-d"
          width={13.447}
          height={14.902}
          x={16.32}
          y={15.908}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.625} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.898039 0 0 0 0 0.560784 0 0 0 1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_917_3659"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_917_3659"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
