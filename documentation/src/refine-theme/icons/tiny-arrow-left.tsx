import React from "react";

export const TinyArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={6}
    viewBox="0 0 8 6"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.138.529a.667.667 0 0 0-.943 0l-2 2a.667.667 0 0 0 0 .943l2 2a.667.667 0 1 0 .943-.943l-.862-.862h5.057a.667.667 0 1 0 0-1.333H2.276l.862-.862a.667.667 0 0 0 0-.943Z"
      clipRule="evenodd"
    />
  </svg>
);
