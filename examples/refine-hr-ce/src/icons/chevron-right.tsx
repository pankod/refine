import type { SVGProps } from "react";

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.667 4.667S9.333 7.122 9.333 8c0 .878-2.666 3.333-2.666 3.333"
    />
  </svg>
);
