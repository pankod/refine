import React from "react";

export const CheckAltIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z"
      clipRule="evenodd"
    />
    <path
      fill="#14141F"
      fillRule="evenodd"
      d="M4.293 7.293a1 1 0 0 1 1.414 0L7 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
);
