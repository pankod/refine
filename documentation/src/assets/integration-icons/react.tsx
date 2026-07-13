import * as React from "react";
import type { SVGProps } from "react";

const SvgReact = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={54}
    height={48}
    viewBox="0 0 54 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#react_svg__a)">
      <path
        d="M26.976 28.808a4.808 4.808 0 1 0 0-9.616 4.808 4.808 0 0 0 0 9.616Z"
        fill="#61DAFB"
      />
      <path
        d="M26.975 33.852c14.25 0 25.802-4.411 25.802-9.852 0-5.441-11.552-9.852-25.802-9.852S1.173 18.558 1.173 24c0 5.44 11.552 9.852 25.802 9.852Z"
        stroke="#61DAFB"
        strokeWidth={2.346}
      />
      <path
        d="M18.444 28.926c7.125 12.34 16.72 20.14 21.433 17.42 4.712-2.721 2.755-14.931-4.37-27.272-7.125-12.34-16.72-20.14-21.432-17.42-4.712 2.721-2.756 14.93 4.369 27.272Z"
        stroke="#61DAFB"
        strokeWidth={2.346}
      />
      <path
        d="M18.444 19.074c-7.125 12.341-9.081 24.55-4.37 27.271 4.713 2.72 14.309-5.078 21.434-17.42 7.125-12.34 9.08-24.55 4.369-27.27-4.712-2.72-14.308 5.078-21.433 17.42Z"
        stroke="#61DAFB"
        strokeWidth={2.346}
      />
    </g>
    <defs>
      <clipPath id="react_svg__a">
        <path fill="#fff" d="M0 0h53.95v48H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgReact;
