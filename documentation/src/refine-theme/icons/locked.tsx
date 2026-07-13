import React from "react";

export const LockedIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.25}
      d="M6.875 6.875H5.812a2.687 2.687 0 0 0-2.687 2.688v4.624a2.687 2.687 0 0 0 2.688 2.688h8.375a2.687 2.687 0 0 0 2.687-2.688V9.564a2.687 2.687 0 0 0-2.688-2.688h-1.062m-6.25 0v-2.25a1.5 1.5 0 0 1 1.5-1.5h3.25a1.5 1.5 0 0 1 1.5 1.5v2.25m-6.25 0h6.25M10 10v3.75"
    />
  </svg>
);
