import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const BlackBoxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <path
      fill="#A855F7"
      fillOpacity={0.15}
      d="M0 12C0 5.373 5.373 0 12 0h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12H12C5.373 64 0 58.627 0 52V12Z"
    />
    <path
      stroke="#C084FC"
      strokeLinecap="round"
      strokeWidth={2}
      d="M30 47h4M17 32c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 5.928-3.438 11.052-8.43 13.488a.247.247 0 0 1-.331-.119l-3.595-7.704a.258.258 0 0 1 .118-.337 6 6 0 1 0-5.524 0 .258.258 0 0 1 .118.337l-3.595 7.704a.247.247 0 0 1-.332.12C20.44 43.051 17 37.927 17 32Z"
    />
  </svg>
);
