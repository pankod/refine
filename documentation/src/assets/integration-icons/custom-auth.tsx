import React, { type SVGProps } from "react";

const CustomAuthIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v8a1 1 0 0 0 .293.707l1 1a1 1 0 0 0 1.414 0l1-1A1 1 0 0 0 14 19v-8h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9Zm4.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
      <path d="M4.707 8.293a1 1 0 0 1 0 1.414L2.414 12l2.293 2.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0ZM21.586 12l-2.293-2.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L21.586 12Z" />
    </g>
  </svg>
);

export default CustomAuthIcon;
