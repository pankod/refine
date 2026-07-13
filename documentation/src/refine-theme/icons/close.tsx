import * as React from "react";
import type { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="6.80786"
      y="23.7783"
      width="24"
      height="2"
      rx="1"
      transform="rotate(-45 6.80786 23.7783)"
      fill="currentColor"
    />
    <rect
      x="8.22192"
      y="6.80762"
      width="24"
      height="2"
      rx="1"
      transform="rotate(45 8.22192 6.80762)"
      fill="currentColor"
    />
  </svg>
);
