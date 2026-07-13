import * as React from "react";
import type { SVGProps } from "react";

export const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16.192 9.942a.625.625 0 1 0-.884-.884l-4.558 4.558-2.058-2.058a.625.625 0 1 0-.884.884l2.5 2.5c.244.244.64.244.884 0l5-5Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-1.25 0a8.75 8.75 0 1 1-17.5 0 8.75 8.75 0 0 1 17.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
