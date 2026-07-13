import * as React from "react";
import type { SVGProps } from "react";

const SvgAntd = ({
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
      d="M29.212 1.136 1.133 29.194a3.849 3.849 0 0 0 0 5.453l28.08 28.057a3.857 3.857 0 0 0 5.458 0L46.444 50.94a3.457 3.457 0 0 0 0-4.892 3.464 3.464 0 0 0-4.896 0l-8.926 8.918a.916.916 0 0 1-1.322 0L8.877 32.56a.914.914 0 0 1 0-1.32L31.301 8.834a.916.916 0 0 1 1.321 0l8.926 8.918a3.464 3.464 0 0 0 4.896 0 3.457 3.457 0 0 0 0-4.892L34.67 1.098a3.894 3.894 0 0 0-5.459.038Z"
      fill={`url(#antd_svg__a-${props.id || ""})`}
    />
    <path
      d="M29.212 1.136 1.133 29.194a3.849 3.849 0 0 0 0 5.453l28.08 28.057a3.857 3.857 0 0 0 5.458 0L46.444 50.94a3.457 3.457 0 0 0 0-4.892 3.464 3.464 0 0 0-4.896 0l-8.926 8.918a.916.916 0 0 1-1.322 0L8.877 32.56a.914.914 0 0 1 0-1.32L31.301 8.834c.935-.806 2.462-2.44 4.703-2.822 1.666-.284 3.488.34 5.465 1.875l-6.798-6.79a3.894 3.894 0 0 0-5.459.04Z"
      fill={`url(#antd_svg__b-${props.id || ""})`}
    />
    <path
      d="M49.162 43.439a3.464 3.464 0 0 0 4.896 0l8.684-8.678a3.849 3.849 0 0 0 0-5.453l-8.76-8.722a3.47 3.47 0 0 0-4.9.004 3.457 3.457 0 0 0 0 4.892l5.916 5.912a.915.915 0 0 1 0 1.32l-5.836 5.833a3.457 3.457 0 0 0 0 4.892Z"
      fill={`url(#antd_svg__c-${props.id || ""})`}
    />
    <path
      d="M32.082 39.636a7.579 7.579 0 0 0 7.581-7.575 7.579 7.579 0 0 0-7.581-7.576 7.579 7.579 0 0 0-7.582 7.576 7.579 7.579 0 0 0 7.582 7.575Z"
      fill={`url(#antd_svg__d-${props.id || ""})`}
    />
    <defs>
      <linearGradient
        id={`antd_svg__a-${props.id || ""}`}
        x1={29.472}
        y1={0}
        x2={56.157}
        y2={16.296}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={withBrandColor ? "#4285EB" : "currentColor"} />
        <stop
          offset={1}
          stopColor={withBrandColor ? "#2EC7FF" : "currentColor"}
        />
      </linearGradient>
      <linearGradient
        id={`antd_svg__b-${props.id || ""}`}
        x1={33.052}
        y1={0}
        x2={19.872}
        y2={68.116}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={withBrandColor ? "#29CDFF" : "currentColor"} />
        <stop
          offset={0.379}
          stopColor={withBrandColor ? "#148EFF" : "currentColor"}
        />
        <stop
          offset={1}
          stopColor={withBrandColor ? "#0A60FF" : "currentColor"}
        />
      </linearGradient>
      <linearGradient
        id={`antd_svg__c-${props.id || ""}`}
        x1={59.084}
        y1={16.347}
        x2={41.935}
        y2={43.167}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={withBrandColor ? "#FA816E" : "currentColor"} />
        <stop
          offset={0.415}
          stopColor={withBrandColor ? "#F74A5C" : "currentColor"}
        />
        <stop
          offset={1}
          stopColor={withBrandColor ? "#F51D2C" : "currentColor"}
        />
      </linearGradient>
      <linearGradient
        id={`antd_svg__d-${props.id || ""}`}
        x1={34.831}
        y1={19.078}
        x2={29.125}
        y2={41.902}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={withBrandColor ? "#FA8E7D" : "currentColor"} />
        <stop
          offset={0.513}
          stopColor={withBrandColor ? "#F74A5C" : "currentColor"}
        />
        <stop
          offset={1}
          stopColor={withBrandColor ? "#F51D2C" : "currentColor"}
        />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgAntd;
