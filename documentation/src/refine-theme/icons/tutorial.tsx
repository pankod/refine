import React from "react";

export const TutorialIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.625 9.375a.625.625 0 1 0 0 1.25h6.25a.625.625 0 1 0 0-1.25h-6.25ZM5 12.5c0-.345.28-.625.625-.625h3.75a.625.625 0 1 1 0 1.25h-3.75A.625.625 0 0 1 5 12.5ZM5.625 6.875a.625.625 0 1 0 0 1.25h8.75a.625.625 0 1 0 0-1.25h-8.75Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 6a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6Zm6-4.75h8A4.75 4.75 0 0 1 18.75 6v8A4.75 4.75 0 0 1 14 18.75H6A4.75 4.75 0 0 1 1.25 14V6A4.75 4.75 0 0 1 6 1.25Z"
      clipRule="evenodd"
    />
  </svg>
);
