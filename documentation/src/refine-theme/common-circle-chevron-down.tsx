import * as React from "react";
import type { SVGProps } from "react";

export const CommonCircleChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.354 10.646a.5.5 0 0 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5a.5.5 0 0 0-.708-.708L12.5 12.793l-2.146-2.147Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M20.5 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      clipRule="evenodd"
    />
  </svg>
);
