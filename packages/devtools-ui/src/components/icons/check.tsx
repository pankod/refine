import React from "react";

export const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g fill="currentColor">
      <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L7 9.293 5.354 7.646a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4Z" />
      <path
        fillRule="evenodd"
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
