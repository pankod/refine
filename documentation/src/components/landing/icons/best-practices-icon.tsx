import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const BestPracticeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(
      props.className,
      "dark:text-refine-yellow text-refine-orange",
    )}
  >
    <rect
      width={64}
      height={64}
      fill="url(#best-practice-a)"
      fillOpacity={0.4}
      rx={16}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M34.683 16.633a6 6 0 0 0-5.366 0l-10 5A6 6 0 0 0 16 27v3a1 1 0 1 0 2 0v-3a4 4 0 0 1 2.211-3.578l10-5a4 4 0 0 1 3.578 0l10 5A4 4 0 0 1 46 27v10a4 4 0 0 1-2.211 3.578l-1.736.868a1 1 0 0 0 .894 1.789l1.736-.868A6 6 0 0 0 48 37V27a6 6 0 0 0-3.317-5.367l-10-5Zm-8.101 11.313A3 3 0 0 1 29.39 26h.617a3 3 0 0 1 3 3v2a1 1 0 0 0 1 1h2.57c2.364 0 4.016 2.343 3.22 4.57l-2.899 8.112A5 5 0 0 1 32.19 48H19a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h4.617a1 1 0 0 0 .937-.649l2.028-5.405ZM29.39 28a1 1 0 0 0-.936.649l-2.028 5.405a2.998 2.998 0 0 1-1.423 1.607V46h7.187a3 3 0 0 0 2.825-1.99l2.898-8.112A1.42 1.42 0 0 0 36.576 34h-2.57a3 3 0 0 1-3-3v-2a1 1 0 0 0-1-1h-.616ZM19 36h4.003v10H19a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#best-practice-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <defs>
      <radialGradient
        id="best-practice-a"
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
        id="best-practice-b"
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
