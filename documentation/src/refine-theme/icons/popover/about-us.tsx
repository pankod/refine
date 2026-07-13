import React from "react";

export const AboutUsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    {...props}
  >
    <rect
      width={40}
      height={40}
      className="text-white dark:text-refine-cyan-alt/10"
      fill="currentColor"
      rx={20}
    />
    <rect
      width={40}
      height={40}
      className="text-refine-blue"
      fill="currentColor"
      rx={20}
      fillOpacity="0.1"
    />
    <path
      className="text-refine-blue dark:text-refine-cyan-alt"
      fill="currentColor"
      fillRule="evenodd"
      d="M21.193 12.281a2.667 2.667 0 0 0-2.386 0l-5.333 2.667A2.667 2.667 0 0 0 12 17.333v5.334c0 1.01.57 1.933 1.474 2.385l5.333 2.666c.751.376 1.635.376 2.386 0l5.333-2.666A2.667 2.667 0 0 0 28 22.667v-5.334c0-1.01-.57-1.933-1.474-2.385l-5.333-2.667Zm-3.86 5.052a2.667 2.667 0 0 1 5.334 0v5.334a2.667 2.667 0 0 1-5.334 0v-5.334Z"
      clipRule="evenodd"
    />
    <path
      className="text-refine-blue dark:text-refine-cyan-alt"
      fill="currentColor"
      d="M21.333 17.333a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z"
    />
  </svg>
);
