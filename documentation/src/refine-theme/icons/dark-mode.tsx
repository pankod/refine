import React from "react";

export const DarkModeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 2.5a5.303 5.303 0 0 0 7.5 7.5A7.5 7.5 0 1 1 10 2.5Z"
    />
  </svg>
);
