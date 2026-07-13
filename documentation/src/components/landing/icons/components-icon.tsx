import * as React from "react";
import type { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export const ComponentsIcon = (props: SVGProps<SVGSVGElement>) => {
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
        fill="url(#components-a)"
        fillRule="evenodd"
        d="M10 0c.345 0 .625.28.625.625V2.5h1.25V.625a.625.625 0 1 1 1.25 0V2.5h1.063A3.313 3.313 0 0 1 17.5 5.813v1.062h1.875a.625.625 0 1 1 0 1.25H17.5v1.25h1.875a.625.625 0 1 1 0 1.25H17.5v1.25h1.875a.625.625 0 1 1 0 1.25H17.5v1.063a3.313 3.313 0 0 1-3.313 3.312h-1.062v1.875a.625.625 0 1 1-1.25 0V17.5h-1.25v1.875a.625.625 0 1 1-1.25 0V17.5h-1.25v1.875a.625.625 0 1 1-1.25 0V17.5H5.812A3.313 3.313 0 0 1 2.5 14.187v-1.062H.625a.625.625 0 1 1 0-1.25H2.5v-1.25H.625a.625.625 0 1 1 0-1.25H2.5v-1.25H.625a.625.625 0 1 1 0-1.25H2.5V5.812A3.313 3.313 0 0 1 5.813 2.5h1.062V.625a.625.625 0 1 1 1.25 0V2.5h1.25V.625C9.375.28 9.655 0 10 0ZM3.75 14.188c0 1.139.923 2.062 2.063 2.062h8.375c1.139 0 2.062-.923 2.062-2.063V5.813c0-1.14-.923-2.063-2.063-2.063H5.813c-1.14 0-2.063.923-2.063 2.063v8.375Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="components-a"
          x1={0}
          x2={20}
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
