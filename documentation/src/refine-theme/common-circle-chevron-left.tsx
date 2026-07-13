import * as React from "react";
import type { SVGProps } from "react";

export const CommonCircleChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M13.692 9.317a.625.625 0 1 0-.884-.884l-3.125 3.125a.625.625 0 0 0 0 .884l3.125 3.125a.625.625 0 1 0 .884-.884L11.009 12l2.683-2.683Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-1.25a8.75 8.75 0 1 1 0-17.5 8.75 8.75 0 0 1 0 17.5Z"
      clipRule="evenodd"
    />
  </svg>
);
