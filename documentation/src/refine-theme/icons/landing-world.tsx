import React, { type SVGProps } from "react";

export const LandingWorldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 24c6.627 0 12-5.372 12-12s-5.373-12-12-12S.5 5.372.5 12s5.373 12 12 12Zm-3-4.5v.988a8.956 8.956 0 0 1-1.5-.692V16.5l-1.5-.75-.75-1.5v-1.5l-1.5-1.5-.481-1.444a9.019 9.019 0 0 1 4.523-5.764l.458.458 3 .75-.75 1.5h-.75l-.75 1.5L8 9l-2.25.75v.75l.75.75V12l.75-.75.75 1.5h2.25l.75 1.5h1.5v2.25L11 18v.75l-1.5.75Zm9.75-1.547A8.966 8.966 0 0 0 21.5 12a8.97 8.97 0 0 0-.66-3.39L18.5 9l-2.25-.75-.75-.75H14L12.5 9l.75 2.25 2.25 1.5L17 12l.75.75v1.5l1.5 2.25v1.453Zm0-10.453.739-.493a9.05 9.05 0 0 0-2.803-2.692L17 4.5l-1.5.75H14l-.75 1.5h1.5l1.5-.75 1.5 1.5h1.5Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={12.5}
        y1={0}
        x2={12.5}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset={1} stopColor="#3FDCF7" stopOpacity={0.4} />
      </linearGradient>
    </defs>
  </svg>
);
