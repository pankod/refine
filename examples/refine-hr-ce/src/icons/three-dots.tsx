import type { SVGProps } from "react";

export const ThreeDotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={4}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.5 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
    />
  </svg>
);
