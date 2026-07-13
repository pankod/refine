import type { SVGProps } from "react";

export const Rank3Icon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <title>3</title>
      <g filter="url(#rank-3-a)">
        <rect
          width={40}
          height={40}
          x={10}
          y={9}
          fill="url(#rank-3-b)"
          rx={20}
        />
        <path
          fill="#fff"
          d="M25.296 27.826h1.406c.547 0 1-.094 1.358-.283.364-.189.635-.45.81-.781.176-.332.264-.713.264-1.143 0-.45-.081-.833-.244-1.152a1.648 1.648 0 0 0-.723-.752c-.319-.176-.726-.264-1.22-.264-.417 0-.795.085-1.133.254a1.923 1.923 0 0 0-.791.703c-.196.3-.293.658-.293 1.074h-2.364c0-.755.199-1.425.596-2.011a4.049 4.049 0 0 1 1.621-1.377c.69-.339 1.465-.508 2.324-.508.918 0 1.72.153 2.403.459.69.3 1.227.749 1.611 1.348.384.598.576 1.34.576 2.226 0 .404-.094.814-.283 1.23a3.574 3.574 0 0 1-.84 1.143c-.37.339-.833.615-1.386.83-.554.209-1.195.313-1.924.313h-1.768v-1.309Zm0 1.836v-1.289h1.768c.833 0 1.543.098 2.129.293.592.195 1.074.465 1.445.81.371.34.641.727.81 1.163.176.436.264.898.264 1.386 0 .665-.12 1.257-.361 1.778-.235.514-.57.95-1.006 1.308a4.488 4.488 0 0 1-1.533.81c-.58.183-1.211.274-1.895.274a6.04 6.04 0 0 1-1.758-.254 4.797 4.797 0 0 1-1.503-.752 3.73 3.73 0 0 1-1.055-1.26c-.254-.507-.381-1.093-.381-1.757h2.353c0 .423.098.797.293 1.123.202.319.482.57.84.752.365.182.782.273 1.25.273.495 0 .922-.088 1.28-.263.358-.176.631-.437.82-.782.195-.345.293-.761.293-1.25 0-.553-.108-1.002-.322-1.347a1.896 1.896 0 0 0-.918-.762c-.398-.17-.866-.254-1.407-.254h-1.406Zm8.988 5.166c0-.364.124-.67.371-.918.248-.254.583-.38 1.006-.38.43 0 .765.126 1.006.38.247.248.37.554.37.918 0 .365-.123.67-.37.918-.241.247-.576.371-1.006.371-.423 0-.758-.123-1.006-.37a1.247 1.247 0 0 1-.371-.919Z"
        />
      </g>
      <defs>
        <linearGradient
          id="rank-3-b"
          x1={30}
          x2={30}
          y1={9}
          y2={49}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#795548" />
          <stop offset={1} stopColor="#A1887F" />
        </linearGradient>
        <filter
          id="rank-3-a"
          width={60}
          height={60}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1413_824"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="effect1_dropShadow_1413_824"
            result="effect2_dropShadow_1413_824"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2.5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
          <feBlend
            in2="effect2_dropShadow_1413_824"
            result="effect3_dropShadow_1413_824"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect3_dropShadow_1413_824"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
