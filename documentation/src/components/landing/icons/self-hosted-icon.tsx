import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const SelfHostedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <path
      fill="#22C55E"
      fillOpacity={0.15}
      d="M0 12C0 5.373 5.373 0 12 0h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12H12C5.373 64 0 58.627 0 52V12Z"
    />
    <path
      stroke="#4ADE80"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M45.077 42c.345-1.341.607-3.045.944-5.241l.452-2.939c.53-3.446.794-5.169.143-6.696-.652-1.527-2.097-2.572-4.988-4.662l-2.16-1.562C35.872 18.3 34.075 17 32 17s-3.873 1.3-7.468 3.9l-2.16 1.562c-2.891 2.09-4.336 3.135-4.988 4.662-.651 1.527-.386 3.25.143 6.696l.452 2.939c.337 2.197.599 3.9.944 5.241M32 43h4m-8 0h1m3-8h4m-8 0h1m9 4H26m12 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2m12 0a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H26a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2"
    />
  </svg>
);
