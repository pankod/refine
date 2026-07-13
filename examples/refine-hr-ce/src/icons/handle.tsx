import type { SVGProps } from "react";

export const HandleIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.667 4.667h10.666M2.667 8h10.666M2.667 11.334h10.666"
    />
  </svg>
);
