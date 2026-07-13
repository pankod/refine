import clsx from "clsx";
import React from "react";

export const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
    className={clsx("dark:text-gray-0 text-gray-900")}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M3.1 1.5A1.6 1.6 0 0 0 1.97 4.232l4.218 4.219v7.111a.937.937 0 0 0 1.5.75l3.75-2.812a.937.937 0 0 0 .376-.75v-4.3l4.218-4.218A1.6 1.6 0 0 0 14.9 1.5H3.1Z"
    />
  </svg>
);
