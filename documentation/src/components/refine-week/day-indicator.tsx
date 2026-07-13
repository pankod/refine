import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  id?: string;
  variant: "strapi" | "supabase";
  day: number;
};

export const DayIndicator = ({
  variant,
  day,
  id: idFromProps,
  ...props
}: Props) => {
  const { startColor, stopColor } = React.useMemo(() => {
    switch (variant) {
      case "supabase":
        return {
          startColor: "text-refine-week-supabase-day-indicator-start",
          stopColor: "text-refine-week-supabase-day-indicator-stop",
        };

      case "strapi":
        return {
          startColor: "text-refine-week-strapi-day-indicator-start",
          stopColor: "text-refine-week-strapi-day-indicator-stop",
        };

      default:
        return {
          startColor: "#fff",
          stopColor: "#fff",
        };
    }
  }, [variant]);

  const id = idFromProps ?? `day-indicator-${variant}-${day}`;

  return (
    <svg
      width="80"
      height="64"
      viewBox="0 0 80 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 6.10352e-05C3.58172 6.10352e-05 0 3.58178 0 8.00006L0 56.0001C0 60.4183 3.58172 64.0001 8 64.0001H61.6C64.0826 64.0001 66.3412 62.5643 67.3949 60.3165L79.3949 34.7164C79.7983 33.8559 80 32.928 80 32.0001C80 31.0721 79.7983 30.1442 79.3949 29.2837L67.3949 3.68365C66.3412 1.43579 64.0826 6.10352e-05 61.6 6.10352e-05L8 6.10352e-05Z"
        fill={`url(#${id})`}
      />

      <g>
        <text
          className={clsx({
            "text-gray-1000": variant === "supabase",
            "text-gray-0": variant === "strapi",
          })}
          x="20"
          fontSize="12px"
          y="20"
          fontWeight={600}
          fill="currentColor"
          fillOpacity={0.5}
        >
          DAY
        </text>
        <text
          className={clsx({
            "text-gray-900": variant === "supabase",
            "text-gray-0": variant === "strapi",
          })}
          x="28"
          y="48"
          fontSize="24px"
          fontWeight={700}
          fill="currentColor"
        >
          {day}
        </text>
      </g>

      <defs>
        <linearGradient
          id={`${id}`}
          x1="2.08616e-06"
          y1="32.0001"
          x2="80"
          y2="32.0001"
          gradientUnits="userSpaceOnUse"
        >
          <stop className={clsx(`${startColor}`)} stopColor="currentColor" />
          <stop
            offset={1}
            className={clsx(`${stopColor}`)}
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
