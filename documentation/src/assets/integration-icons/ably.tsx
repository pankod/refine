import * as React from "react";
import type { SVGProps } from "react";

const SvgAbly = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={40}
    viewBox="0 0 48 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.959 36.495 23.876 0h-5.32L0 33.773l3.959 2.722Zm40.206 0L24.124 0h5.443L48 33.773l-3.835 2.722Zm-20.041-15.34 19.793 15.587-3.834 2.846-15.836-12.371-15.835 12.37-4.082-2.845 19.794-15.587Z"
      fill="url(#ably_svg__a)"
    />
    <defs>
      <linearGradient
        id="ably_svg__a"
        x1={13.293}
        y1={48.706}
        x2={33.025}
        y2={26.791}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5416" />
        <stop offset={0.254} stopColor="#FF5115" />
        <stop offset={0.461} stopColor="#FF4712" />
        <stop offset={0.652} stopColor="#FF350E" />
        <stop offset={0.833} stopColor="#FF1E08" />
        <stop offset={1} stopColor="red" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgAbly;
