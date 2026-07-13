import * as React from "react";
import type { SVGProps } from "react";

const SvgAtlassian = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
  >
    <path
      fill="url(#atlassian-a)"
      d="M7.619 11.453a.683.683 0 0 0-1.162.126L.574 23.349a.704.704 0 0 0 .63 1.02h8.191a.678.678 0 0 0 .63-.39c1.766-3.654.695-9.21-2.406-12.526Z"
    />
    <path
      fill="#2684FF"
      d="M11.934.746a15.534 15.534 0 0 0-.906 15.329l3.95 7.904a.703.703 0 0 0 .628.39h8.191a.703.703 0 0 0 .629-1.02L13.13.743a.664.664 0 0 0-1.196.004Z"
    />
    <defs>
      <linearGradient
        id="atlassian-a"
        x1={10.843}
        x2={4.628}
        y1={13.269}
        y2={24.027}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0052CC" />
        <stop offset={0.923} stopColor="#2684FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgAtlassian;
