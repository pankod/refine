import type { SVGProps } from "react";

export const RequestsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g stroke="currentColor" clipPath="url(#requests-a)">
      <path
        strokeLinecap="round"
        d="M8.333 2h-.666C4.68 2 3.188 2 2.26 2.927c-.928.928-.928 2.42-.928 5.406 0 2.986 0 4.479.928 5.406.927.927 2.42.927 5.406.927 2.985 0 4.478 0 5.405-.927.928-.928.928-2.42.928-5.406v-.666"
      />
      <path d="M14.667 3.667a2.333 2.333 0 1 1-4.667 0 2.333 2.333 0 0 1 4.667 0Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.667 7.333h2.666M4.667 10.667H10"
      />
    </g>
    <defs>
      <clipPath id="requests-a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
