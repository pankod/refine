import * as React from "react";
import type { SVGProps } from "react";

export const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4 10a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM4 16a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM5 21a1 1 0 1 0 0 2h22a1 1 0 1 0 0-2H5Z"
    />
  </svg>
);
