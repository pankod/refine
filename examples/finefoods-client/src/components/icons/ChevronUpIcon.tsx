"use client";

import * as React from "react";
import type { SVGProps } from "react";

const SvgChevronUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-up"
    {...props}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export default SvgChevronUpIcon;
