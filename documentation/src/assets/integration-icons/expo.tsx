import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

const SvgExpo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
    className={clsx("dark:text-gray-0 text-gray-1000", props.className)}
  >
    <path
      fill="currentColor"
      d="M11.873 9.532c.196-.286.41-.323.585-.323.174 0 .465.037.66.323 2.558 3.483 7.861 12.672 8.352 13.172.726.742 1.723.28 2.301-.56.571-.829.729-1.41.729-2.029 0-.422-8.259-15.66-9.092-16.928-.8-1.22-1.06-1.528-2.428-1.528h-1.024c-1.366 0-1.563.308-2.363 1.527C8.76 4.457.5 19.694.5 20.116c0 .62.158 1.2.729 2.029.578.84 1.575 1.303 2.301.56.49-.5 5.786-9.688 8.343-13.17v-.003Z"
    />
  </svg>
);

export default SvgExpo;
