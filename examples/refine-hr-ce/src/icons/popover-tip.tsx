import type { SVGProps } from "react";

export const PopoverTipIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      stroke="url(#popover-tip-gradient)"
      d="M23.697 2.077C23.108 1.105 22.1.5 21 .5s-2.108.605-2.697 1.577l-3.026 4.992C14.35 8.601 12.802 9.5 11.168 9.5H.5v8h41v-8H30.833c-1.634 0-3.182-.899-4.11-2.431l-3.026-4.992Z"
    />
    <defs>
      <linearGradient
        id="popover-tip-gradient"
        x1={21}
        x2={21}
        y1={1}
        y2={16}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.59} stopColor="#94A3B8" />
        <stop offset={0.602} stopColor="#94A3B8" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
