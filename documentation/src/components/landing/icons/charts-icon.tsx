import * as React from "react";
import type { SVGProps } from "react";

export const ChartsIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V17h-4V5.5ZM9 8.5A1.5 1.5 0 0 0 7.5 7h-1A1.5 1.5 0 0 0 5 8.5V16a1 1 0 0 0 1 1h3V8.5ZM19 19a1 1 0 0 0-1-1H6a1 1 0 1 0 0 2h12a1 1 0 0 0 1-1ZM19 11.5a1.5 1.5 0 0 0-1.5-1.5h-1a1.5 1.5 0 0 0-1.5 1.5V17h3a1 1 0 0 0 1-1v-4.5Z"
      />
    </svg>
  );
};
