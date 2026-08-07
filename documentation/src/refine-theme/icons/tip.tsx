import React from "react";

export const TipIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12.5 11.666c.167-.833.583-1.416 1.25-2.083.833-.75 1.25-1.833 1.25-2.917a5 5 0 0 0-10 0C5 7.5 5.167 8.5 6.25 9.584c.583.583 1.083 1.25 1.25 2.083M7.5 15h5m-4.167 3.333h3.334"
    />
  </svg>
);
