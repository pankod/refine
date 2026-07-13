import type { SVGProps } from "react";

export const CheckRectangleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
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
        d="M1.667 8c0-2.986 0-4.478.927-5.406.928-.927 2.42-.927 5.406-.927 2.986 0 4.479 0 5.406.927.928.928.928 2.42.928 5.406 0 2.986 0 4.478-.928 5.406-.927.927-2.42.927-5.406.927-2.985 0-4.478 0-5.406-.927-.927-.928-.927-2.42-.927-5.406Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.333 8.333 7 10l3.666-4"
      />
    </svg>
  );
};
