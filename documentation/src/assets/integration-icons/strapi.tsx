import * as React from "react";
import type { SVGProps } from "react";

const SvgStrapi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#4945FF"
      d="M39.44 0H8.56A8.56 8.56 0 0 0 0 8.56v30.88A8.56 8.56 0 0 0 8.56 48h30.88A8.56 8.56 0 0 0 48 39.44V8.56A8.56 8.56 0 0 0 39.44 0Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M33.281 14.48h-16.38v8.181H25.1a.24.24 0 0 1 .24.24v8.197h8.181v-16.38a.24.24 0 0 0-.239-.238Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M16.903 14.48v8.181H9.01a.12.12 0 0 1-.085-.204l7.978-7.977ZM25.544 39.075a.12.12 0 0 1-.204-.084v-7.893h8.181l-7.977 7.977Z"
      clipRule="evenodd"
      opacity={0.42}
    />
    <path
      fill="#fff"
      d="M16.905 22.661h8.317a.12.12 0 0 1 .12.12v8.317h-8.198a.24.24 0 0 1-.24-.239v-8.198Z"
      opacity={0.42}
    />
  </svg>
);

export default SvgStrapi;
