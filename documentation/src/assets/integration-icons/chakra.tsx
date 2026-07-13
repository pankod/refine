import * as React from "react";
import type { SVGProps } from "react";

const SvgChakra = ({
  withBrandColor = true,
  ...props
}: SVGProps<SVGSVGElement> & { withBrandColor?: boolean }) => (
  <svg
    width="65"
    height="65"
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="32.7988"
      cy="32.8003"
      r="32"
      fill={`url(#chakra_svg__d-${props.id || ""})`}
    />
    <path
      d="M18.4223 34.422L39.9834 13.0093C40.3861 12.6092 41.0344 13.096 40.7624 13.5944L32.7376 28.3026C32.5584 28.6305 32.7959 29.0307 33.1696 29.0307H47.0379C47.4847 29.0307 47.7003 29.5779 47.3736 29.8829L23.0714 52.564C22.6357 52.9706 21.9871 52.3976 22.3369 51.9151L33.8411 36.0449C34.0769 35.7194 33.8445 35.2636 33.4426 35.2636H18.7692C18.3298 35.2636 18.1105 34.7316 18.4223 34.422Z"
      className="text-white dark:text-gray-900"
      fill={withBrandColor ? "#FFFFFF" : "currentColor"}
    />
    <defs>
      <linearGradient
        id={`chakra_svg__d-${props.id || ""}`}
        x1="32.7988"
        y1="0.800293"
        x2="32.7988"
        y2="64.8003"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={withBrandColor ? "#7ACBD4" : "currentColor"} />
        <stop
          offset="0.916667"
          stopColor={withBrandColor ? "#2AC6B7" : "currentColor"}
        />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgChakra;
