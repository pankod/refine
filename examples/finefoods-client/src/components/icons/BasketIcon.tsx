"use client";

import * as React from "react";
import type { SVGProps } from "react";

const SvgBasketIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 7.313h-3.188v-.375a4.313 4.313 0 0 0-8.625 0v.375H4.5a.75.75 0 0 0-.75.75v12.562c0 .415.335.75.75.75h15a.75.75 0 0 0 .75-.75V8.062a.75.75 0 0 0-.75-.75ZM9.375 6.938A2.624 2.624 0 0 1 12 4.313a2.624 2.624 0 0 1 2.625 2.625v.375h-5.25v-.375Zm9.188 12.75H5.438V9h2.25v2.063c0 .103.084.187.187.187h1.313a.188.188 0 0 0 .187-.188V9h5.25v2.063c0 .103.084.187.188.187h1.312a.188.188 0 0 0 .188-.188V9h2.25v10.688Z"
      fill="#fff"
    />
  </svg>
);

export default SvgBasketIcon;
