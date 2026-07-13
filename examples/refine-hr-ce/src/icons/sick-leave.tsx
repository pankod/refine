import type { SVGProps } from "react";

export const SickLeaveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M20.193 13a6 6 0 1 1-10.392 6m10.392-6a6 6 0 0 0-10.392 6m10.392-6L9.801 19"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m10.043 5.542 5.085-3.005c1.872-1.106 4.266-.45 5.347 1.467A4.082 4.082 0 0 1 20 8.682m-9.957-3.14L4.958 8.547c-1.872 1.106-2.514 3.556-1.433 5.472A3.904 3.904 0 0 0 6.5 16m3.543-10.458L11.5 8"
    />
  </svg>
);
