import type { SVGProps } from "react";

export const IconPaginationGoToLast = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <title>{"go to last"}</title>
    <path
      fill="currentColor"
      d="M9 .75h3v10.5H9V.75ZM4.5 5.25H6v1.5H4.5v1.5H3v1.5H1.5v1.5H0V.75h1.5v1.5H3v1.5h1.5v1.5Z"
    />
  </svg>
);
