import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

const ShadCnUI = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
    className={clsx(props.className, "dark:text-white text-gray-1000")}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m20 12-7.5 7.5M18.5 3.75 4.25 18"
    />
  </svg>
);

export default ShadCnUI;
