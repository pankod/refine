import type { SVGProps } from "react";

export const IconClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={14}
    viewBox="0 0 16 14"
    fill="none"
    {...props}
  >
    <title>Close</title>
    <path
      fill="#000"
      d="M4 12v2H0v-2h2v-2h2V8h2V6H4V4H2V2H0V0h4v2h2v2h4V2h2V0h4v2h-2v2h-2v2h-2v2h2v2h2v2h2v2h-4v-2h-2v-2H6v2H4Z"
    />
  </svg>
);
