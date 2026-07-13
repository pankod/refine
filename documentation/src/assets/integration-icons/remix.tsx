import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

const SvgRemix = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={45}
    height={52}
    viewBox="0 0 45 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("dark:text-gray-0 text-[#273646]", className)}
    {...props}
  >
    <path
      d="M43.49 52c0-3.074 0-5.89-.467-11.899-.576-6.035-3.706-9.095-9.06-10.17C40.306 29.104 45 24.143 45 16.537 45 6.367 38.329 0 24.904 0H0v10.599h22.433c5.93 0 8.895 2.556 8.895 6.772 0 4.796-2.965 6.607-8.895 6.607H0V34.81h21.774c4.695 0 7.248 1.323 7.66 7.276.311 4.064.272 6.077.235 8.008V50.12a94.98 94.98 0 0 0-.024 1.88h13.844Z"
      fill="currentColor"
    />
    <path
      d="M0 43.925V52h17.614v-5.168c0-1.086-.53-2.907-2.976-2.907H0Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgRemix;
