import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const InfiniteScalabilityIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(
      props.className,
      "dark:text-refine-cyan-alt text-refine-cyan",
    )}
  >
    <rect
      width={64}
      height={64}
      fill="url(#infinite-scalability-a)"
      fillOpacity={0.4}
      rx={16}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M31 16a3 3 0 0 0-3 3v26a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2h-6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V19a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H33a1 1 0 1 0 0 2h12a3 3 0 0 0 3-3V19a3 3 0 0 0-3-3H31Zm8 4a1 1 0 1 0 0 2h1.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L42 23.414V25a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1h-4Z"
      clipRule="evenodd"
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#infinite-scalability-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <defs>
      <radialGradient
        id="infinite-scalability-a"
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
        id="infinite-scalability-b"
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
