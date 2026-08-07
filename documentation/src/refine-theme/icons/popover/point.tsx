import clsx from "clsx";
import React from "react";

export const PointIcon = ({
  variant = "landing",
  ...props
}: React.SVGProps<SVGSVGElement> & {
  variant?: "landing" | "blog";
}) => (
  <svg
    width="46"
    height="18"
    viewBox="0 0 46 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={clsx(
      variant === "landing" && "text-white dark:text-gray-900",
      variant === "blog" && "text-white dark:text-zinc-900",
      props.className,
    )}
  >
    <title>Popover Point</title>
    <path
      d="M25.9122 2.05859L25.9122 2.05857C25.263 1.08491 24.1702 0.5 23 0.5C21.8298 0.5 20.737 1.08491 20.0878 2.05857L20.0878 2.05859L16.7596 7.05085C15.7396 8.58094 14.0223 9.5 12.1833 9.5H1H0.5V10V17V17.5H1H45H45.5V17V10V9.5H45H33.8167C31.9777 9.5 30.2605 8.58094 29.2404 7.05085L25.9122 2.05859Z"
      fill="currentColor"
      stroke={`url(#point-${props?.id})`}
    />
    <defs>
      <linearGradient
        id={`point-${props?.id}`}
        x1="23"
        y1="1"
        x2="23"
        y2="16"
        gradientUnits="userSpaceOnUse"
        className={clsx(
          variant === "landing" && "text-gray-200 dark:text-gray-700",
          variant === "blog" && "text-zinc-200 dark:text-zinc-600",
        )}
      >
        <stop offset="0.590414" stopColor="currentColor" />
        <stop offset="0.601525" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
