import * as React from "react";
import type { SVGProps } from "react";

export const ThumbsUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <title>Thumbs Up</title>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.667 6.667v8M10 3.92l-.667 2.747h3.887a1.333 1.333 0 0 1 1.28 1.706l-1.553 5.334a1.333 1.333 0 0 1-1.28.96h-9a1.333 1.333 0 0 1-1.334-1.334V8a1.333 1.333 0 0 1 1.334-1.333h1.84a1.333 1.333 0 0 0 1.193-.74L8 1.333a2.087 2.087 0 0 1 2 2.587Z"
    />
  </svg>
);
