import React from "react";

export const ResizeHandleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={26}
    viewBox="0 0 10 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={9} height={25} rx={4.5} fill="#1D1E30" />
    <path
      d="M7 5C7 6.10457 6.10457 7 5 7C3.89543 7 3 6.10457 3 5C3 3.89543 3.89543 3 5 3C6.10457 3 7 3.89543 7 5Z"
      fill="#303450"
    />
    <path
      d="M7 13C7 14.1046 6.10457 15 5 15C3.89543 15 3 14.1046 3 13C3 11.8954 3.89543 11 5 11C6.10457 11 7 11.8954 7 13Z"
      fill="#303450"
    />
    <path
      d="M7 21C7 22.1046 6.10457 23 5 23C3.89543 23 3 22.1046 3 21C3 19.8954 3.89543 19 5 19C6.10457 19 7 19.8954 7 21Z"
      fill="#303450"
    />
    <rect x={0.5} y={0.5} width={9} height={25} rx={4.5} stroke="#303450" />
  </svg>
);
