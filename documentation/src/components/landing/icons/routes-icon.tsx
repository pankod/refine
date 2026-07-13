import * as React from "react";
import type { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export const RoutesIcon = (props: SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        fill="url(#routes-a)"
        d="M7.937 5a3.126 3.126 0 1 1 0-1.25h5.375a3.437 3.437 0 1 1 0 6.875H7.689a2.188 2.188 0 0 0 0 4.375H15.5v-1.875a.625.625 0 0 1 1.067-.442l2.5 2.5a.625.625 0 0 1 0 .884l-2.5 2.5a.625.625 0 0 1-1.067-.442V16.25H7.687a3.437 3.437 0 1 1 0-6.875h5.625a2.188 2.188 0 0 0 0-4.375H7.938Z"
      />
      <defs>
        <linearGradient
          id="routes-a"
          x1={1.75}
          x2={19.25}
          y1={1.25}
          y2={18.75}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={isDarkTheme ? "#26D97F" : "#1FAD66"} />
          <stop
            offset={1}
            stopColor={isDarkTheme ? "#47EBEB" : "#0FBDBD"}
            stopOpacity={isDarkTheme ? 0.5 : 1}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
