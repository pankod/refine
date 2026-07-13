import * as React from "react";
import type { SVGProps } from "react";

export const RefineLogoShinyBlue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M14.399 7.4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#b)"
      fillRule="evenodd"
      d="M8.278 7.32a3.72 3.72 0 1 1 7.44 0v9.36a3.72 3.72 0 1 1-7.44 0V7.32Zm3.72-3.12a3.12 3.12 0 0 0-3.12 3.12v9.36a3.12 3.12 0 0 0 6.24 0V7.32a3.12 3.12 0 0 0-3.12-3.12Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#c)"
      fillRule="evenodd"
      d="M9.317.633a6 6 0 0 1 5.366 0l6 3A6 6 0 0 1 24 9v6a6 6 0 0 1-3.317 5.367l-6 3a6 6 0 0 1-5.366 0l-6-3A6 6 0 0 1 0 15V9a6 6 0 0 1 3.317-5.367l6-3Zm.268.537a5.4 5.4 0 0 1 4.83 0l6 3A5.4 5.4 0 0 1 23.4 9v6a5.4 5.4 0 0 1-2.985 4.83l-6 3a5.4 5.4 0 0 1-4.83 0l-6-3A5.4 5.4 0 0 1 .6 15V9a5.4 5.4 0 0 1 2.985-4.83l6-3Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#d)"
      fillRule="evenodd"
      d="M9.585 1.17a5.4 5.4 0 0 1 4.83 0l6 3A5.4 5.4 0 0 1 23.4 9v6a5.4 5.4 0 0 1-2.985 4.83l-6 3a5.4 5.4 0 0 1-4.83 0l-6-3A5.4 5.4 0 0 1 .6 15V9a5.4 5.4 0 0 1 2.985-4.83l6-3Zm2.413 2.43a3.72 3.72 0 0 0-3.72 3.72v9.36a3.72 3.72 0 1 0 7.44 0V7.32a3.72 3.72 0 0 0-3.72-3.72Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="a"
        x1={12}
        x2={12}
        y1={5.1}
        y2={9.9}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6EB3F7" />
        <stop offset={1} stopColor="#0080FF" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={12}
        x2={12}
        y1={3.6}
        y2={20.4}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#33F" />
        <stop offset={1} stopColor="#0080FF" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={12}
        x2={12}
        y1={0}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6EB3F7" />
        <stop offset={1} stopColor="#0080FF" />
      </linearGradient>
      <radialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 24 -24 0 12 0)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0080FF" />
        <stop offset={1} stopColor="#6EB3F7" />
      </radialGradient>
    </defs>
  </svg>
);
