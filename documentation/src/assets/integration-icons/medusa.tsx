import * as React from "react";
import type { SVGProps } from "react";

const SvgMedusa = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={45}
    height={48}
    viewBox="0 0 45 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M39.024 7.792 28.14 1.538a11.49 11.49 0 0 0-11.487 0L5.718 7.792C2.207 9.842 0 13.645 0 17.697v12.556c0 4.102 2.207 7.854 5.718 9.905l10.885 6.304a11.49 11.49 0 0 0 11.486 0l10.885-6.304a11.38 11.38 0 0 0 5.718-9.905V17.697c.1-4.052-2.106-7.854-5.668-9.905ZM22.371 35.156c-6.17 0-11.185-5.003-11.185-11.156 0-6.153 5.015-11.156 11.185-11.156 6.17 0 11.236 5.003 11.236 11.156 0 6.153-5.016 11.156-11.236 11.156Z"
      fill={`url(#medusa_svg__a-${props.id || ""})`}
    />
    <defs>
      <linearGradient
        id={`medusa_svg__a-${props.id || ""}`}
        x1={-38.338}
        y1={39.298}
        x2={52.789}
        y2={16.332}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.266} stopColor="#592EE1" />
        <stop offset={1} stopColor="#B836D9" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgMedusa;
