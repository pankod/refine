import * as React from "react";
import type { SVGProps } from "react";

export const CrossCircle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.317 8.433a.625.625 0 1 0-.884.884L11.116 12l-2.683 2.683a.625.625 0 1 0 .884.884L12 12.884l2.683 2.683a.625.625 0 1 0 .884-.884L12.884 12l2.683-2.683a.625.625 0 1 0-.884-.884L12 11.116 9.317 8.433Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-1.25 0a8.75 8.75 0 1 1-17.5 0 8.75 8.75 0 0 1 17.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
