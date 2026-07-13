"use client";

import * as React from "react";
import type { SVGProps } from "react";

const SvgChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-left"
    {...props}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default SvgChevronLeftIcon;
