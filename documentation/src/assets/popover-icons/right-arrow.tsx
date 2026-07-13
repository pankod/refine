import * as React from "react";
import type { SVGProps } from "react";

const SvgRightArrow = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="10"
    height="18"
    viewBox="0 0 10 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className ? className : undefined}
    {...props}
  >
    <path
      d="M1.06102 0.938983C0.826703 1.1733 0.826702 1.5532 1.06102 1.78751L8.2735 9L1.06102 16.2125C0.826701 16.4468 0.826702 16.8267 1.06102 17.061C1.29533 17.2953 1.67523 17.2953 1.90954 17.061L9.5463 9.42426C9.78061 9.18995 9.78061 8.81005 9.5463 8.57573L1.90954 0.938983C1.67523 0.704669 1.29533 0.704669 1.06102 0.938983Z"
      fill="#66B5FF"
    />
  </svg>
);

export default SvgRightArrow;
