import * as React from "react";
import type { SVGProps } from "react";

const SvgClerk = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clerk-a)">
      <path
        fill="url(#clerk-b)"
        d="m19.616 3.53-2.88 2.88a.571.571 0 0 1-.701.084 6.854 6.854 0 0 0-10.39 5.647 6.867 6.867 0 0 0 .979 3.763.571.571 0 0 1-.084.7l-2.88 2.88a.57.57 0 0 1-.865-.063A11.994 11.994 0 0 1 19.551 2.663a.57.57 0 0 1 .065.866Z"
      />
      <path
        fill="#1F0256"
        d="m19.613 21.197-2.88-2.88a.571.571 0 0 0-.7-.084 6.854 6.854 0 0 1-7.081 0 .571.571 0 0 0-.7.084l-2.881 2.88a.57.57 0 0 0 .062.876 11.994 11.994 0 0 0 14.114 0 .571.571 0 0 0 .066-.876Z"
      />
      <path
        fill="#fff"
        d="m19.613 21.197-2.88-2.88a.571.571 0 0 0-.7-.084 6.854 6.854 0 0 1-7.081 0 .571.571 0 0 0-.7.084l-2.881 2.88a.57.57 0 0 0 .062.876 11.994 11.994 0 0 0 14.114 0 .571.571 0 0 0 .066-.876Z"
      />
      <path
        fill="#1F0256"
        d="M12.497 15.79a3.427 3.427 0 1 0 0-6.853 3.427 3.427 0 0 0 0 6.854Z"
      />
      <path
        fill="#fff"
        d="M12.497 15.79a3.427 3.427 0 1 0 0-6.853 3.427 3.427 0 0 0 0 6.854Z"
      />
    </g>
    <defs>
      <linearGradient
        id="clerk-b"
        x1={16.909}
        x2={-7.385}
        y1={-1.39}
        y2={22.905}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#17CCFC" />
        <stop offset={0.5} stopColor="#5D31FF" />
        <stop offset={1} stopColor="#F35AFF" />
      </linearGradient>
      <clipPath id="clerk-a">
        <path fill="#fff" d="M.5.368h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgClerk;
