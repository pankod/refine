import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const SecurityIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(
      props.className,
      "dark:text-refine-green-alt text-refine-green",
    )}
  >
    <rect
      width={64}
      height={64}
      fill="url(#security-a)"
      fillOpacity={0.4}
      rx={16}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M30.767 16.359h.001l.007.008.035.04a14.069 14.069 0 0 0 .784.804c.56.532 1.392 1.244 2.46 1.957C36.198 20.596 39.257 22 43 22a1 1 0 0 1 1 1c0 1.428-.097 2.994-.294 4.62a1 1 0 1 1-1.986-.24 38.4 38.4 0 0 0 .265-3.41c-3.79-.228-6.872-1.693-9.04-3.138A20.663 20.663 0 0 1 30 18.453a20.663 20.663 0 0 1-2.945 2.38c-2.168 1.444-5.25 2.91-9.04 3.137.132 4.252 1.113 9.615 3.027 14.005C23.134 42.776 26.139 46 30 46c.77 0 1.494-.125 2.178-.358a1 1 0 1 1 .644 1.893A8.704 8.704 0 0 1 30 48c-5.14 0-8.634-4.276-10.792-9.225C17.02 33.755 16 27.616 16 23a1 1 0 0 1 1-1c3.744 0 6.803-1.404 8.945-2.832 1.07-.713 1.9-1.425 2.461-1.956a14.069 14.069 0 0 0 .784-.804l.035-.04.007-.008a1 1 0 0 1 1.535-.001Zm16.996 13.287a1 1 0 1 0-1.526-1.292l-10.298 12.17-4.232-4.231a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.47-.061l11-13Z"
      clipRule="evenodd"
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#security-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <defs>
      <radialGradient
        id="security-a"
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
        id="security-b"
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
