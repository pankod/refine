import React, { type SVGProps } from "react";

const ViteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      fill={`url(#${props?.id || ""}-vite-colored-a)`}
      d="m47.841 7.104-22.548 40.27a1.226 1.226 0 0 1-2.134.009L.164 7.108c-.515-.901.257-1.993 1.28-1.81l22.572 4.029a1.227 1.227 0 0 0 .435 0l22.1-4.024c1.02-.185 1.796.898 1.29 1.802Z"
    />
    <path
      fill={`url(#${props?.id || ""}-vite-colored-b)`}
      d="M34.769.012 18.082 3.277a.612.612 0 0 0-.493.565l-1.027 17.314a.613.613 0 0 0 .75.632l4.645-1.07c.435-.1.828.282.738.718l-1.38 6.75a.612.612 0 0 0 .778.708l2.87-.87a.612.612 0 0 1 .778.709l-2.193 10.603c-.138.663.746 1.025 1.114.456l.246-.38 13.597-27.1a.612.612 0 0 0-.664-.875l-4.782.922a.612.612 0 0 1-.705-.771L35.475.782a.612.612 0 0 0-.706-.77Z"
    />
    <defs>
      <linearGradient
        id={`${props?.id || ""}-vite-colored-a`}
        x1={-0.398}
        x2={27.619}
        y1={3.858}
        y2={41.955}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#41D1FF" />
        <stop offset={1} stopColor="#BD34FE" />
      </linearGradient>
      <linearGradient
        id={`${props?.id || ""}-vite-colored-b`}
        x1={22.721}
        x2={27.785}
        y1={0.898}
        y2={35.68}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFEA83" />
        <stop offset={0.083} stopColor="#FFDD35" />
        <stop offset={1} stopColor="#FFA800" />
        <stop offset={1} stopColor="#FFA800" />
      </linearGradient>
    </defs>
  </svg>
);

export default ViteIcon;
