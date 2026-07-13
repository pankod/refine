import React from "react";

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0ZM8.993 4.883A1 1 0 0 0 7 5v3l.008.124a1 1 0 0 0 .437.708l3 2 .101.06a1 1 0 0 0 1.286-.337l.06-.101a1 1 0 0 0-.337-1.286L9 7.464V5l-.007-.117Z"
      clipRule="evenodd"
    />
  </svg>
);
