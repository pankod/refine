import * as React from "react";
import type { SVGProps } from "react";

export const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g fill="currentColor" opacity={0.25}>
      <path d="M8.4 12.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM9.6 15.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM12 12.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM13.2 15.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM15.6 12.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
      <path
        fillRule="evenodd"
        d="M8.4 4a2 2 0 0 0-2 2v.4A2.4 2.4 0 0 0 4 8.8v8.8A2.4 2.4 0 0 0 6.4 20h11.2a2.4 2.4 0 0 0 2.4-2.4V8.8a2.4 2.4 0 0 0-2.4-2.4V6a2 2 0 1 0-4 0v.4h-3.2V6a2 2 0 0 0-2-2ZM8 6a.4.4 0 0 1 .8 0v1.2a.8.8 0 0 0 .8.8h4.8a.8.8 0 0 0 .8-.8V6a.4.4 0 0 1 .8 0v1.2a.8.8 0 0 0 .8.8h.8a.8.8 0 0 1 .8.8v8.8a.8.8 0 0 1-.8.8H6.4a.8.8 0 0 1-.8-.8V8.8a.8.8 0 0 1 .8-.8h.8a.8.8 0 0 0 .8-.8V6Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

export const CalendarArrowUpIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.333 12 12 9.334m0 0L14.667 12M12 9.334v5.333M10.667 1.333V4M14 7.562V4a1.334 1.334 0 0 0-1.333-1.333H3.333A1.333 1.333 0 0 0 2 4v9.334a1.333 1.333 0 0 0 1.333 1.333h6M2 6.667h12M5.333 1.334V4"
    />
  </svg>
);
