import React from "react";

export const LightModeIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M10 2.5v.833m0 13.334v.833M2.5 10h.833m13.334 0h.833m-2.197-5.303-.589.589m-9.428 9.428-.59.59m0-10.607.59.589m9.428 9.428.59.59M13.333 10a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.666 0Z"
    />
  </svg>
);
