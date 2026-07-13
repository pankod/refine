import * as React from "react";
import type { SVGProps } from "react";

export const BasicMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={40}
    viewBox="0 0 32 40"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 15.14C0 6.778 7.163 0 16 0s16 6.778 16 15.14C32 23.5 24.657 29.274 16 40 6.984 29.274 0 23.501 0 15.14Z"
    />
  </svg>
);
