import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const NoVendorLockinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(
      props.className,
      "dark:text-refine-purple-alt text-refine-purple",
    )}
  >
    <rect
      width={64}
      height={64}
      fill="url(#no-vendor-lockin-a)"
      fillOpacity={0.4}
      rx={16}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M34.683 16.633a6 6 0 0 0-5.366 0l-10 5A6 6 0 0 0 16 27v10a6 6 0 0 0 3.317 5.367l10 5a6 6 0 0 0 5.366 0 1 1 0 0 0-.894-1.79 4 4 0 0 1-3.578 0l-10-5A4 4 0 0 1 18 37V27a4 4 0 0 1 2.211-3.578l10-5a4 4 0 0 1 3.578 0l10 5A4 4 0 0 1 46 27v10a4 4 0 0 1-2.211 3.578l-1.736.868a1 1 0 0 0 .894 1.789l1.736-.868A6 6 0 0 0 48 37V27a6 6 0 0 0-3.317-5.367l-10-5ZM28 32a4 4 0 1 1 5.882 3.53 1 1 0 0 0-.41 1.353l5.646 10.588a1 1 0 0 0 1.764-.942l-5.215-9.78a6 6 0 1 0-7.333 0l-1.75 3.28a1 1 0 0 0 1.765.942l2.18-4.088a1 1 0 0 0-.411-1.352A4 4 0 0 1 28 32Z"
      clipRule="evenodd"
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#no-vendor-lockin-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <defs>
      <radialGradient
        id="no-vendor-lockin-a"
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
        id="no-vendor-lockin-b"
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
