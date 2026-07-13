import type { SVGProps } from "react";

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
    style={{ flexShrink: 0 }}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.333 6.667S8.878 9.333 8 9.333c-.879 0-3.333-2.666-3.333-2.666"
    />
  </svg>
);
