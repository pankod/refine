"use client";

import * as React from "react";

import type { SVGProps } from "react";

const DividerVerticalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={2}
    height={24}
    viewBox="0 0 2 24"
    fill="none"
    {...props}
  >
    <path stroke="currentColor" strokeOpacity={0.5} d="M1 0v24" />
  </svg>
);

export default DividerVerticalIcon;
