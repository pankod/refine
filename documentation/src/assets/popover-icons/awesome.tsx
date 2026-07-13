import * as React from "react";
import type { SVGProps } from "react";

const SvgAwesome = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="17"
    viewBox="0 0 32 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className ? className : undefined}
    {...props}
  >
    <g opacity="0.75">
      <path
        d="M23.6373 0.00545461L22.4907 1.26003L29.2831 7.51111H2.51044L9.30277 1.25458L8.15622 0L0.00543419 7.51111H0V9.90572L31.7881 9.96026V7.51111L23.6373 0.00545461Z"
        fill="url(#paint0_linear_1502_1214)"
      />
      <path
        d="M0 12.5625V9.96027L14.6746 10.0136V12.5625C14.6746 14.7488 12.5158 16.5298 9.86507 16.5298H4.80956C2.15884 16.5298 0 14.7488 0 12.5625Z"
        fill="url(#paint1_linear_1502_1214)"
      />
      <path
        d="M17.3254 12.5625V10.0136H32V12.5625C32 14.7488 29.8412 16.5298 27.1904 16.5298H22.1349C19.4842 16.5298 17.3254 14.7488 17.3254 12.5625Z"
        fill="url(#paint2_linear_1502_1214)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1502_1214"
        x1="15.894"
        y1="0"
        x2="15.894"
        y2="9.96027"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1502_1214"
        x1="16"
        y1="9.96027"
        x2="16"
        y2="16.5298"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1502_1214"
        x1="16"
        y1="9.96027"
        x2="16"
        y2="16.5298"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgAwesome;
