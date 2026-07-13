import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const ProServicesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(props.className, "text-refine-red")}
  >
    <rect
      width={64}
      height={64}
      fill="url(#pro-services-a)"
      fillOpacity={0.3}
      rx={16}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 21.802a5.8 5.8 0 0 1 5.8-5.8h14.4a5.8 5.8 0 0 1 5.8 5.8v.2h.2a5.8 5.8 0 0 1 5.8 5.8v10.4a5.8 5.8 0 0 1-5.8 5.8h-4.786l-3.283 3.283C32.607 48.809 30 47.73 30 45.574v-1.572h-2.2a5.8 5.8 0 0 1-5.8-5.8v-.2h-.2a5.8 5.8 0 0 1-5.8-5.8v-10.4Zm24 0v.2H27.8a5.8 5.8 0 0 0-5.8 5.8v8.2h-.2a3.8 3.8 0 0 1-3.8-3.8v-10.4a3.8 3.8 0 0 1 3.8-3.8h14.4a3.8 3.8 0 0 1 3.8 3.8Zm-12.2 2.2a3.8 3.8 0 0 0-3.8 3.8v10.4a3.8 3.8 0 0 0 3.8 3.8h3a1.2 1.2 0 0 1 1.2 1.2v2.372a.42.42 0 0 0 .717.297l3.517-3.518a1.2 1.2 0 0 1 .849-.351H42.2a3.8 3.8 0 0 0 3.8-3.8v-10.4a3.8 3.8 0 0 0-3.8-3.8H27.8Zm1.2 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      clipRule="evenodd"
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#pro-services-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <defs>
      <radialGradient
        id="pro-services-a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(45) scale(90.5097)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" stopOpacity={0.25} />
      </radialGradient>
      <radialGradient
        id="pro-services-b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(45) scale(90.5097)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={0.5} stopColor="currentColor" stopOpacity={0} />
        <stop offset={1} stopColor="currentColor" stopOpacity={0.25} />
      </radialGradient>
    </defs>
  </svg>
);
