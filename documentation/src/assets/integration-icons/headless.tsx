import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

const SvgHeadless = ({
  withBrandColor = true,
  ...props
}: SVGProps<SVGSVGElement> & { withBrandColor?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
    className={clsx(
      withBrandColor ? "text-gray-800 dark:text-gray-0" : "inherit",
      props.className,
    )}
  >
    <path
      fill="currentColor"
      d="M35.828 9.723a5.008 5.008 0 0 1-.818 4.29l.006.003-8.426 12.441a10.947 10.947 0 0 0-6.803-3.925l6.57-13.51.006.003a5.026 5.026 0 0 1 9.465.698ZM18.826 26.295a6.482 6.482 0 0 1 4.983 2.874c.531.801.892 1.74 1.017 2.78a6.43 6.43 0 0 1-3.861 6.683L13.073 42l-1.027-8.513a6.43 6.43 0 0 1 3.862-6.683 6.406 6.406 0 0 1 2.918-.51ZM38.586 16.586a2 2 0 0 0 0 2.828L43.172 24l-4.586 4.586a2 2 0 1 0 2.828 2.828l6-6a2 2 0 0 0 0-2.828l-6-6a2 2 0 0 0-2.828 0ZM9.414 19.414a2 2 0 1 0-2.828-2.828l-6 6a2 2 0 0 0 0 2.828l6 6a2 2 0 1 0 2.828-2.828L4.828 24l4.586-4.586Z"
    />
  </svg>
);

export default SvgHeadless;
