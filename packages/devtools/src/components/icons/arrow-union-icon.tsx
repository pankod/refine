import * as React from "react";
import type { SVGProps } from "react";

export const ArrowUnionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="#303450"
      stroke="url(#arrow-union-icon)"
      d="M.5 8.495V15.5h15V8.495a4.5 4.5 0 0 1-3.816-2.483L9.341 1.33c-.553-1.105-2.13-1.105-2.683 0L4.317 6.012A4.5 4.5 0 0 1 .5 8.495Z"
    />
    <defs>
      <linearGradient
        id="arrow-union-icon"
        x1={8}
        x2={8}
        y1={0}
        y2={10}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#474E6B" />
        <stop offset={0.9} stopColor="#474E6B" />
        <stop offset={0.901} stopColor="#474E6B" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
