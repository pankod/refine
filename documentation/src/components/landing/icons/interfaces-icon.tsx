import * as React from "react";
import type { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export const InterfacesIcon = (props: SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={20}
      fill="none"
      {...props}
    >
      <path
        fill="url(#components-a)"
        d="M4.875 4.688a.937.937 0 1 0 0-1.875.937.937 0 0 0 0 1.874Z"
      />
      <path
        fill="url(#components-b)"
        d="M8.938 3.75a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.875 0Z"
      />
      <path
        fill="url(#components-c)"
        fillRule="evenodd"
        d="M5 0A4.5 4.5 0 0 0 .5 4.5V14a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V4.5A4.5 4.5 0 0 0 16 0H5Zm11 1.25H5A3.25 3.25 0 0 0 1.75 4.5v1.75h17.5V4.5A3.25 3.25 0 0 0 16 1.25ZM1.75 14V7.5h17.5V14a4.75 4.75 0 0 1-4.75 4.75h-8A4.75 4.75 0 0 1 1.75 14Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="components-a"
          x1={0.5}
          x2={20.5}
          y1={0}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={isDarkTheme ? "#26D97F" : "#1FAD66"} />
          <stop
            offset={1}
            stopColor={isDarkTheme ? "#47EBEB" : "#0FBDBD"}
            stopOpacity={isDarkTheme ? 0.5 : 1}
          />
        </linearGradient>
        <linearGradient
          id="components-b"
          x1={0.5}
          x2={20.5}
          y1={0}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={isDarkTheme ? "#26D97F" : "#1FAD66"} />
          <stop
            offset={1}
            stopColor={isDarkTheme ? "#47EBEB" : "#0FBDBD"}
            stopOpacity={isDarkTheme ? 0.5 : 1}
          />
        </linearGradient>
        <linearGradient
          id="components-c"
          x1={0.5}
          x2={20.5}
          y1={0}
          y2={20}
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
