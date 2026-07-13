import * as React from "react";
import type { SVGProps } from "react";

export const CommonCircleChevronUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14.646 13.354a.5.5 0 0 0 .708-.708l-2.5-2.5a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 .708.708l2.146-2.147 2.146 2.147Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.5 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm1 0a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
      clipRule="evenodd"
    />
  </svg>
);
