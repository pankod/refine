import type { SVGProps } from "react";
import { useConfigProvider } from "../../context";

export const Rank2Icon = (props: SVGProps<SVGSVGElement>) => {
  const { mode } = useConfigProvider();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      {...props}
    >
      <path
        fill="url(#rank-2-a)"
        stroke={mode === "dark" ? "#000" : "#fff"}
        strokeWidth={2}
        d="M25.429 1.81a7.667 7.667 0 0 0-6.858 0L5.238 8.475A7.667 7.667 0 0 0 1 15.333v13.334a7.666 7.666 0 0 0 4.238 6.857l13.333 6.667a7.666 7.666 0 0 0 6.858 0l13.333-6.667A7.667 7.667 0 0 0 43 28.667V15.333a7.667 7.667 0 0 0-4.238-6.857L25.429 1.81Z"
      />
      <path
        fill="url(#rank-2-b)"
        stroke="url(#rank-2-c)"
        d="M22.969 6.729a2.167 2.167 0 0 0-1.938 0L7.698 13.395A2.167 2.167 0 0 0 6.5 15.333v13.334c0 .82.464 1.57 1.198 1.938L21.03 37.27c.61.305 1.328.305 1.938 0l13.333-6.666a2.167 2.167 0 0 0 1.198-1.938V15.333c0-.82-.464-1.57-1.198-1.938L22.97 6.73ZM19.242 3.15a6.167 6.167 0 0 1 5.516 0L38.09 9.818a6.167 6.167 0 0 1 3.409 5.515v13.334a6.167 6.167 0 0 1-3.409 5.515L24.758 40.85a6.167 6.167 0 0 1-5.516 0L5.91 34.182A6.167 6.167 0 0 1 2.5 28.667V15.333a6.167 6.167 0 0 1 3.409-5.515L19.242 3.15Z"
      />
      <g filter="url(#rank-2-d)">
        <path
          fill="#434343"
          d="M14.139 29v-2.441l4.99-4.385c1.767-1.563 2.11-2.207 2.11-3.086v-.02c0-.996-.772-1.709-1.876-1.709-1.27 0-2.08.81-2.138 1.944l-.01.107h-3.281v-.088c0-2.763 2.246-4.668 5.42-4.668 3.203 0 5.351 1.71 5.351 4.21v.019c0 1.797-.87 2.88-3.203 4.902l-2.754 2.344v.117h6.133V29H14.139Zm14.082.186a1.82 1.82 0 0 1-1.826-1.836c0-1.016.81-1.827 1.826-1.827a1.82 1.82 0 0 1 1.836 1.827c0 1.025-.81 1.835-1.836 1.835Z"
        />
      </g>
      <defs>
        <radialGradient
          id="rank-2-a"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 40 -40 0 22 2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5F5F5" />
          <stop offset={1} stopColor="#BFBFBF" />
        </radialGradient>
        <radialGradient
          id="rank-2-b"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 40 -40 0 22 2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F0" />
          <stop offset={1} stopColor="#595959" />
        </radialGradient>
        <linearGradient
          id="rank-2-c"
          x1={22}
          x2={22}
          y1={2}
          y2={42}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F0" />
          <stop offset={1} stopColor="#434343" />
        </linearGradient>
        <filter
          id="rank-2-d"
          width={16.123}
          height={15.156}
          x={13.934}
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
          <feColorMatrix values="0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_917_3671"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_917_3671"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
