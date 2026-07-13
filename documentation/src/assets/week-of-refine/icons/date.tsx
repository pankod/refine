import * as React from "react";
import type { SVGProps } from "react";

export const DateIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <g opacity=".25">
        <path d="M4.4 8.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM5.6 11.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM8 8.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM9.2 11.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM11.6 8.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
        <path d="M4.4 0a2 2 0 0 0-2 2v.4A2.4 2.4 0 0 0 0 4.8v8.8A2.4 2.4 0 0 0 2.4 16h11.2a2.4 2.4 0 0 0 2.4-2.4V4.8a2.4 2.4 0 0 0-2.4-2.4V2a2 2 0 1 0-4 0v.4H6.4V2a2 2 0 0 0-2-2ZM4 2a.4.4 0 0 1 .8 0v1.2a.8.8 0 0 0 .8.8h4.8a.8.8 0 0 0 .8-.8V2a.4.4 0 0 1 .8 0v1.2a.8.8 0 0 0 .8.8h.8a.8.8 0 0 1 .8.8v8.8a.8.8 0 0 1-.8.8H2.4a.8.8 0 0 1-.8-.8V4.8a.8.8 0 0 1 .8-.8h.8a.8.8 0 0 0 .8-.8V2Z" />
      </g>
    </svg>
  );
};
