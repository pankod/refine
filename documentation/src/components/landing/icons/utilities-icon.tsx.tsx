import * as React from "react";
import type { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export const UtilitiesIcon = (props: SVGProps<SVGSVGElement>) => {
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
        fill="url(#utilities-a)"
        fillRule="evenodd"
        d="M14.25 10a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM13 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#utilities-b)"
        fillRule="evenodd"
        d="m13.285.855.913 2.74 2.83-.58a1.25 1.25 0 0 1 1.333.6l1.599 2.77a1.25 1.25 0 0 1-.148 1.454L17.896 10l1.916 2.16c.357.403.417.99.148 1.455l-1.6 2.77a1.25 1.25 0 0 1-1.333.6l-2.829-.58-.913 2.74a1.25 1.25 0 0 1-1.186.855H8.9a1.25 1.25 0 0 1-1.186-.855l-.913-2.74-2.83.58a1.25 1.25 0 0 1-1.333-.6l-1.599-2.77a1.25 1.25 0 0 1 .147-1.454L3.103 10 1.187 7.84a1.25 1.25 0 0 1-.147-1.455l1.6-2.77a1.25 1.25 0 0 1 1.332-.6l2.83.58.913-2.74A1.25 1.25 0 0 1 8.9 0h3.198a1.25 1.25 0 0 1 1.186.855ZM7.987 16.01a1.25 1.25 0 0 0-1.436-.83l-2.83.58-1.598-2.77 1.916-2.16a1.25 1.25 0 0 0 0-1.66L2.123 7.01l1.599-2.77 2.829.58a1.25 1.25 0 0 0 1.436-.83l.914-2.74h3.198l.913 2.74c.2.6.817.956 1.437.83l2.829-.58 1.6 2.77-1.917 2.16a1.25 1.25 0 0 0 0 1.66l1.916 2.16-1.599 2.77-2.83-.58a1.25 1.25 0 0 0-1.436.83l-.913 2.74H8.9l-.913-2.74Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="utilities-a"
          x1={0.873}
          x2={20.858}
          y1={0}
          y2={19.241}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={isDarkTheme ? "#26D97F" : "#1FAD66"} />
          <stop offset={1} stopColor="#47EBEB" stopOpacity={0.5} />
        </linearGradient>
        <linearGradient
          id="utilities-b"
          x1={0.873}
          x2={20.858}
          y1={0}
          y2={19.241}
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
