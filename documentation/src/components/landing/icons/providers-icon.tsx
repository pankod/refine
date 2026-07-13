import * as React from "react";
import type { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export const ProvidersIcon = (props: SVGProps<SVGSVGElement>) => {
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
        fill="url(#providers-a)"
        d="M15.188 4.938a.937.937 0 1 0 1.874 0 .937.937 0 0 0-1.875 0Z"
      />
      <path
        fill="url(#providers-b)"
        d="M12.063 4.938a.937.937 0 1 0 1.874 0 .937.937 0 0 0-1.874 0Z"
      />
      <path
        fill="url(#providers-c)"
        d="M16.125 16a.937.937 0 1 1 0-1.875.937.937 0 0 1 0 1.875Z"
      />
      <path
        fill="url(#providers-d)"
        d="M13 16a.937.937 0 1 1 0-1.875A.937.937 0 0 1 13 16Z"
      />
      <path
        fill="url(#providers-e)"
        fillRule="evenodd"
        d="M20.5 4.5A4.5 4.5 0 0 0 16 0H5A4.5 4.5 0 0 0 .5 4.5v11A4.5 4.5 0 0 0 5 20h11a4.5 4.5 0 0 0 4.5-4.5v-11ZM16 1.25H5A3.25 3.25 0 0 0 1.75 4.5v4.875h17.5V4.5A3.25 3.25 0 0 0 16 1.25Zm3.25 9.375V15.5A3.25 3.25 0 0 1 16 18.75H5a3.25 3.25 0 0 1-3.25-3.25v-4.875h17.5Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="providers-a"
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
          id="providers-b"
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
          id="providers-c"
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
          id="providers-d"
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
          id="providers-e"
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
