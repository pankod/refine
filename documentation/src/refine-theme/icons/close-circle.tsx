import * as React from "react";
import type { SVGProps } from "react";

export const CloseCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <rect
      width={30.75}
      height={30.75}
      x={0.625}
      y={0.625}
      stroke="currentColor"
      strokeWidth={1.25}
      rx={15.375}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m9.125 9.125 13.75 13.75m0-13.75-13.75 13.75"
    />
  </svg>
);
