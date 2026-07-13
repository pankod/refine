import * as React from "react";
import type { SVGProps } from "react";

const SvgChevronDown = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="7"
    height="5"
    viewBox="0 0 7 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className ? className : undefined}
    {...props}
  >
    <path
      d="M0.146447 0.732232C-0.0488156 0.927494 -0.0488155 1.24408 0.146447 1.43934L2.97487 4.26777C3.17014 4.46303 3.48672 4.46303 3.68198 4.26777L6.51041 1.43934C6.70567 1.24408 6.70567 0.927494 6.51041 0.732232C6.31515 0.536969 5.99856 0.53697 5.8033 0.732232L3.32843 3.20711L0.853553 0.732232C0.658291 0.536969 0.341709 0.536969 0.146447 0.732232Z"
      fill="#ABABB2"
    />
  </svg>
);

export default SvgChevronDown;
