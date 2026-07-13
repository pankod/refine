import * as React from "react";
import type { SVGProps } from "react";

export const AuthenticationIcon = (props: SVGProps<SVGSVGElement>) => {
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
        fillRule="evenodd"
        d="m12 7.077-3.974 1.59c.155 2.038.99 4.083 1.956 5.694.532.886 1.084 1.607 1.543 2.094.188.2.349.347.475.447V7.077Zm.743-2.934a2 2 0 0 0-1.486 0l-5 2A2 2 0 0 0 5 8c0 2.992 1.179 5.852 2.41 7.904.624 1.04 1.302 1.94 1.932 2.609a7 7 0 0 0 .994.89c.244.175.864.597 1.664.597.8 0 1.42-.422 1.664-.597.346-.247.683-.56.994-.89.63-.668 1.308-1.57 1.932-2.609C17.821 13.852 19 10.992 19 8a2 2 0 0 0-1.257-1.857l-5-2Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
