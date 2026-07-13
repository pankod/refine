import * as React from "react";
import type { SVGProps } from "react";

const SvgMantine = ({
  withBrandColor = true,
  ...props
}: SVGProps<SVGSVGElement> & { withBrandColor?: boolean }) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M64 32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32Z"
      fill={withBrandColor ? "#339AF0" : "currentColor"}
    />
    <path
      d="M26.041 16.903a2.439 2.439 0 0 0-.133 2.703c.165.273.382.512.639.701 3.727 2.763 5.867 6.987 5.867 11.591 0 4.604-2.14 8.828-5.867 11.59a2.428 2.428 0 0 0-.506 3.402 2.422 2.422 0 0 0 1.598.958 2.441 2.441 0 0 0 1.81-.453 19.736 19.736 0 0 0 3.136-2.902h6.904a2.435 2.435 0 0 0 2.437-2.431 2.433 2.433 0 0 0-2.437-2.432h-3.81a19.218 19.218 0 0 0 1.606-7.732 19.218 19.218 0 0 0-1.606-7.731h3.812a2.434 2.434 0 0 0 2.437-2.432 2.433 2.433 0 0 0-2.437-2.432H32.59a19.74 19.74 0 0 0-3.138-2.904 2.433 2.433 0 0 0-1.807-.453c-.64.096-1.216.44-1.6.957h-.003Z"
      className="text-white dark:text-gray-900"
      fill={withBrandColor ? "#FFFFFF" : "currentColor"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.194 31.173a3.652 3.652 0 0 1 1.026-2.625 3.61 3.61 0 0 1 2.583-1.095 3.593 3.593 0 0 1 2.584 1.095 3.635 3.635 0 0 1 1.025 2.625 3.642 3.642 0 0 1-1.087 2.51 3.599 3.599 0 0 1-5.043 0 3.642 3.642 0 0 1-1.088-2.51Z"
      className="text-white dark:text-gray-900"
      fill={withBrandColor ? "#FFFFFF" : "currentColor"}
    />
  </svg>
);

export default SvgMantine;
