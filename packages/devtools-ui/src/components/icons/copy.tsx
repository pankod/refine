import React from "react";

export const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M3.9 0A3.9 3.9 0 0 0 0 3.9v8.6a.5.5 0 0 0 1 0V3.9A2.9 2.9 0 0 1 3.9 1h8.6a.5.5 0 0 0 0-1H3.9Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.9 3A2.9 2.9 0 0 0 3 5.9v7.2A2.9 2.9 0 0 0 5.9 16h7.2a2.9 2.9 0 0 0 2.9-2.9V5.9A2.9 2.9 0 0 0 13.1 3H5.9ZM4 5.9C4 4.85 4.85 4 5.9 4h7.2c1.05 0 1.9.85 1.9 1.9v7.2a1.9 1.9 0 0 1-1.9 1.9H5.9A1.9 1.9 0 0 1 4 13.1V5.9Z"
      clipRule="evenodd"
    />
  </svg>
);
