import React, { type SVGProps } from "react";

export const LandingClipboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={24}
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 1.5A4.5 4.5 0 0 0 9.5 6h3A4.5 4.5 0 0 0 17 1.5h1.5a3 3 0 0 1 3 3V21a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V4.5a3 3 0 0 1 3-3H5ZM5 12a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 1 1 0 3h-9A1.5 1.5 0 0 1 5 12Zm1.5 4.5a1.5 1.5 0 1 0 0 3h6a1.5 1.5 0 1 0 0-3h-6Z"
      fill="url(#clipboard-a)"
    />
    <path
      d="M12.5 0a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 1 0-3h3Z"
      fill="url(#clipboard-b)"
    />
    <defs>
      <linearGradient
        id="clipboard-a"
        x1={11}
        y1={0}
        x2={11}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset={1} stopColor="#3FDCF7" stopOpacity={0.4} />
      </linearGradient>
      <linearGradient
        id="clipboard-b"
        x1={11}
        y1={0}
        x2={11}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset={1} stopColor="#3FDCF7" stopOpacity={0.4} />
      </linearGradient>
    </defs>
  </svg>
);
