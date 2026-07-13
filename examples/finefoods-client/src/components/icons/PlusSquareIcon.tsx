"use client";

import * as React from "react";
import type { SVGProps } from "react";

const SvgPlusSquareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-plus-square"
    {...props}
  >
    <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
    <line x1={12} y1={8} x2={12} y2={16} />
    <line x1={8} y1={12} x2={16} y2={12} />
  </svg>
);

export default SvgPlusSquareIcon;
