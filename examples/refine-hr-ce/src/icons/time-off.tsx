import type { SVGProps } from "react";

export const TimeOffIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g stroke="currentColor" clipPath="url(#time-off-a)">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5.333V8l1 1" />
      <path d="M13.03 10.969c1.091.589 1.636.884 1.636 1.364 0 .481-.545.776-1.636 1.365l-.743.4c-.838.453-1.256.68-1.458.515-.493-.403.275-1.442.464-1.81.192-.374.189-.572 0-.939-.189-.368-.957-1.408-.464-1.81.202-.165.62.061 1.458.514l.743.4Z" />
      <path
        strokeLinecap="round"
        d="M8.684 14.632a6.667 6.667 0 1 1 5.85-5.299"
      />
    </g>
    <defs>
      <clipPath id="time-off-a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
