import * as React from "react";
import type { SVGProps } from "react";

const SvgUseCases = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="24"
    viewBox="0 0 32 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className ? className : undefined}
    {...props}
  >
    <path
      opacity="0.75"
      d="M0 18.2406L6.40694 19.2558V4.23622L0 5.21652V18.2406ZM1.54053 6.54705L4.90167 6.02199V17.4705L1.54053 16.9454V6.54705ZM25.7329 4.23628V19.2558L31.9998 18.2407L32 5.21671L25.7329 4.23628ZM30.4594 16.9101L27.2384 17.4352V6.02172L30.4594 6.54678V16.9101ZM7.73753 23.4571H24.2975V0H7.73753V23.4571ZM9.24311 1.54047H22.7572V21.9166H9.24311V1.54047Z"
      fill="url(#paint0_linear_1502_839)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1502_839"
        x1="16"
        y1="0"
        x2="16"
        y2="23.4571"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgUseCases;
