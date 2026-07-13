import * as React from "react";
import type { SVGProps } from "react";

export const ThumbsDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <title>Thumbs Down</title>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.333 9.333v-8M6 12.08l.667-2.747H2.78A1.333 1.333 0 0 1 1.5 7.627l1.553-5.334a1.333 1.333 0 0 1 1.28-.96h9a1.333 1.333 0 0 1 1.334 1.334V8a1.333 1.333 0 0 1-1.334 1.333h-1.84a1.333 1.333 0 0 0-1.193.74L8 14.667a2.085 2.085 0 0 1-2-2.587Z"
    />
  </svg>
);
