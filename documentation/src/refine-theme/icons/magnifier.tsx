import * as React from "react";
import type { SVGProps } from "react";

export const MagnifierIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.438 6.188a4.25 4.25 0 1 1-8.5 0 4.25 4.25 0 0 1 8.5 0Zm-.909 4.049a5.25 5.25 0 1 1 .707-.707l2.68 2.679a.5.5 0 0 1-.707.707l-2.68-2.68Z"
      clipRule="evenodd"
    />
  </svg>
);
