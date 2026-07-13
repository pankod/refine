import React from "react";

export const NoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 14.166v4.167M7.5 8.967a1.667 1.667 0 0 1-.925 1.491l-1.484.75a1.667 1.667 0 0 0-.925 1.492v.633a.833.833 0 0 0 .834.833h10a.833.833 0 0 0 .833-.833V12.7a1.667 1.667 0 0 0-.925-1.492l-1.483-.75a1.667 1.667 0 0 1-.925-1.492V5.833A.833.833 0 0 1 13.333 5a1.667 1.667 0 0 0 0-3.333H6.666a1.667 1.667 0 0 0 0 3.333.833.833 0 0 1 .834.833v3.133Z"
    />
  </svg>
);
