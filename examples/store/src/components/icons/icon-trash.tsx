import React from "react";

export const IconTrash = (props: React.SVGProps<SVGSVGElement>) => (
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M2 4h12M12.666 4v9.333c0 .667-.666 1.334-1.333 1.334H4.666c-.666 0-1.333-.667-1.333-1.334V4M5.333 4V2.667C5.333 2 6 1.333 6.666 1.333h2.667c.667 0 1.333.667 1.333 1.334V4M6.667 7.333v4M9.333 7.333v4"
    />
  </svg>
);
