import React from "react";

export const PageIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M5.5 9.5A.5.5 0 0 1 6 9h5a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5ZM6 11a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1H6Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.5 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.957a1 1 0 0 0-.293-.707L11.25 2.293A1 1 0 0 0 10.543 2H4.5Zm0 1h6.043L12.5 4.957V13h-8V3Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M5.5 7.5A.5.5 0 0 1 6 7h5a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5Z"
    />
  </svg>
);
