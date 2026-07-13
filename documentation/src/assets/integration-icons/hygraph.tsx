import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

const SvgHygraph = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={41}
    viewBox="0 0 19 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={clsx("text-[#081026] dark:text-white", props.className)}
  >
    <path
      d="M15.0597 4.30294L11.2949 6.4298L7.53014 8.55608L3.76478 10.6829V23.4429L7.53014 21.3167L11.2943 19.1898V14.9367L7.53014 17.0629V12.8098L11.2943 10.6829L15.0597 8.55666V21.3167L11.2949 23.4429L7.53014 25.5698L3.7642 27.6967L0 29.8229L3.76478 31.9498L7.53014 29.8229L11.2943 27.6967L15.0603 25.5698L18.8256 23.4435V2.17608L15.0597 0.0498047V4.30294Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgHygraph;
