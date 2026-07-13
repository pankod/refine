import type { SVGProps } from "react";
import { useConfigProvider } from "../../context";

export const Rank3Icon = (props: SVGProps<SVGSVGElement>) => {
  const { mode } = useConfigProvider();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={44}
      height={44}
      fill="none"
      {...props}
    >
      <path
        fill="url(#rank-3-a)"
        stroke={mode === "dark" ? "#000" : "#fff"}
        strokeWidth={2}
        d="M25.429 1.81a7.667 7.667 0 0 0-6.858 0L5.238 8.475A7.667 7.667 0 0 0 1 15.333v13.334a7.666 7.666 0 0 0 4.238 6.857l13.333 6.667a7.666 7.666 0 0 0 6.858 0l13.333-6.667A7.667 7.667 0 0 0 43 28.667V15.333a7.667 7.667 0 0 0-4.238-6.857L25.429 1.81Z"
      />
      <path
        fill="url(#rank-3-b)"
        stroke="url(#rank-3-c)"
        d="M22.969 6.729a2.167 2.167 0 0 0-1.938 0L7.698 13.395A2.167 2.167 0 0 0 6.5 15.333v13.334c0 .82.464 1.57 1.198 1.938L21.03 37.27c.61.305 1.328.305 1.938 0l13.333-6.666a2.167 2.167 0 0 0 1.198-1.938V15.333c0-.82-.464-1.57-1.198-1.938L22.97 6.73ZM19.242 3.15a6.167 6.167 0 0 1 5.516 0L38.09 9.818a6.167 6.167 0 0 1 3.409 5.515v13.334a6.167 6.167 0 0 1-3.409 5.515L24.758 40.85a6.167 6.167 0 0 1-5.516 0L5.91 34.182A6.167 6.167 0 0 1 2.5 28.667V15.333a6.167 6.167 0 0 1 3.409-5.515L19.242 3.15Z"
      />
      <g filter="url(#rank-3-d)">
        <path
          fill="#871400"
          d="M19.412 29.254c-3.33 0-5.537-1.719-5.742-4.258l-.01-.117h3.418l.02.107c.117.801.966 1.446 2.304 1.446 1.338 0 2.168-.694 2.168-1.67v-.02c0-1.133-.879-1.758-2.441-1.758h-1.533v-2.431h1.513c1.377 0 2.217-.655 2.217-1.65v-.02c0-.967-.723-1.563-1.943-1.563-1.23 0-2.031.625-2.13 1.543l-.009.088h-3.252l.01-.137c.185-2.52 2.256-4.16 5.38-4.16 3.223 0 5.274 1.485 5.274 3.74v.02c0 1.768-1.318 2.89-2.92 3.213v.068c2.12.215 3.477 1.387 3.477 3.252v.02c0 2.607-2.256 4.287-5.8 4.287Zm9.033-.069a1.82 1.82 0 0 1-1.826-1.835c0-1.016.81-1.827 1.826-1.827a1.82 1.82 0 0 1 1.836 1.827c0 1.025-.81 1.835-1.836 1.835Z"
        />
      </g>
      <defs>
        <radialGradient
          id="rank-3-a"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 40 -40 0 22 2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB96" />
          <stop offset={1} stopColor="#FA541C" />
        </radialGradient>
        <radialGradient
          id="rank-3-b"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 40 -40 0 22 2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB96" />
          <stop offset={1} stopColor="#AD2102" />
        </radialGradient>
        <linearGradient
          id="rank-3-c"
          x1={22}
          x2={22}
          y1={2}
          y2={42}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD8BF" />
          <stop offset={0} stopColor="#FFBB96" />
          <stop offset={1} stopColor="#871400" />
        </linearGradient>
        <filter
          id="rank-3-d"
          width={16.621}
          height={15.225}
          x={13.66}
          y={14.654}
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
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.588235 0 0 0 1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_917_3684"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_917_3684"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
