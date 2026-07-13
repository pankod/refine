import type { SVGProps } from "react";

export const Rank5Icon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <title>5</title>
      <g filter="url(#rank-5-a)">
        <rect width={40} height={40} x={10} y={9} fill="#1E88E5" rx={20} />
        <path
          fill="#fff"
          d="m25.13 29.232-1.445-.37.713-7.08h7.295v1.67H25.93l-.43 3.866c.26-.15.59-.29.986-.42.404-.13.866-.195 1.387-.195.658 0 1.247.114 1.768.342.52.221.963.54 1.328.957.371.417.654.918.85 1.504.195.586.292 1.24.292 1.963 0 .683-.094 1.312-.283 1.884a4.238 4.238 0 0 1-.83 1.504c-.37.424-.84.752-1.406.987-.56.234-1.22.351-1.983.351a5.579 5.579 0 0 1-1.63-.234 4.197 4.197 0 0 1-1.367-.733 3.968 3.968 0 0 1-.977-1.23c-.247-.495-.404-1.074-.469-1.738h1.719c.078.534.234.983.469 1.347.234.365.54.642.918.83.384.183.83.274 1.337.274.43 0 .811-.075 1.143-.225.332-.15.612-.364.84-.644.228-.28.4-.619.517-1.016a4.49 4.49 0 0 0 .186-1.338c0-.449-.062-.866-.186-1.25a2.862 2.862 0 0 0-.556-1.006 2.437 2.437 0 0 0-.889-.664 2.852 2.852 0 0 0-1.21-.244c-.606 0-1.065.082-1.378.244a5.265 5.265 0 0 0-.947.664Zm9.34 5.811c0-.306.094-.563.283-.771.195-.215.475-.323.84-.323.364 0 .64.108.83.323.195.208.293.465.293.771 0 .3-.098.553-.293.762-.19.208-.466.312-.83.312-.365 0-.645-.104-.84-.312a1.094 1.094 0 0 1-.284-.762Z"
        />
      </g>
      <defs>
        <filter
          id="rank-5-a"
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
            result="effect1_dropShadow_1413_840"
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
            in2="effect1_dropShadow_1413_840"
            result="effect2_dropShadow_1413_840"
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
            in2="effect2_dropShadow_1413_840"
            result="effect3_dropShadow_1413_840"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect3_dropShadow_1413_840"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
