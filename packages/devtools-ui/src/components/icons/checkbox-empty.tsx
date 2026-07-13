import React from "react";

export const CheckboxEmptyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <rect width={11} height={11} x={0.5} y={0.5} fill="#14141F" rx={2.5} />
    <rect width={11} height={11} x={0.5} y={0.5} stroke="#303450" rx={2.5} />
  </svg>
);
