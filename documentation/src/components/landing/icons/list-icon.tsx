import * as React from "react";
import type { SVGProps } from "react";

export const ListIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M7.5 6a1.5 1.5 0 1 0 0 3h6a1.5 1.5 0 1 0 0-3h-6ZM7.5 10.5a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 1 0 0-3h-9ZM7.5 15a1.5 1.5 0 1 0 0 3h3a1.5 1.5 0 1 0 0-3h-3Z"
      />
    </svg>
  );
};
