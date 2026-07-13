import * as React from "react";
import type { SVGProps } from "react";

const SvgOracle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={26}
    viewBox="0 0 25 26"
    fill="none"
    {...props}
  >
    <g clipPath="url(#oracle-a)">
      <path
        fill="#E32124"
        d="M7.882 20.882A7.85 7.85 0 0 1 0 13a7.85 7.85 0 0 1 7.882-7.882h9.236A7.85 7.85 0 0 1 25 13a7.85 7.85 0 0 1-7.882 7.882H7.882Zm8.997-2.787A5.08 5.08 0 0 0 21.974 13a5.08 5.08 0 0 0-5.095-5.096H8.121A5.08 5.08 0 0 0 3.025 13c0 2.787 2.31 5.096 5.096 5.096h8.758Z"
      />
    </g>
    <defs>
      <clipPath id="oracle-a">
        <path fill="#fff" d="M0 .5h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgOracle;
