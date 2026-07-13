import React from "react";

export const CheckboxFilledIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <rect width={12} height={12} fill="#0080FF" rx={3} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3 6 2 2 4-4"
    />
  </svg>
);
