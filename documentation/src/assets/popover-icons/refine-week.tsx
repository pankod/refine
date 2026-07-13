import * as React from "react";
import type { SVGProps } from "react";

const SvgRefineWeek = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className ? className : undefined}
    {...props}
  >
    <g opacity="0.75">
      <path
        d="M7.00024 0.999999C7.00024 0.447715 7.44795 0 8.00024 0C8.55252 0 9.00024 0.447715 9.00024 1V5C9.00024 5.55229 8.55252 6 8.00024 6C7.44795 6 7.00024 5.55228 7.00024 5V0.999999Z"
        fill="url(#paint0_linear_1502_1488)"
      />
      <path
        d="M15.0005 0.999999C15.0005 0.447715 15.4482 0 16.0005 0C16.5528 0 17.0005 0.447715 17.0005 1V5C17.0005 5.55229 16.5528 6 16.0005 6C15.4482 6 15.0005 5.55228 15.0005 5V0.999999Z"
        fill="url(#paint1_linear_1502_1488)"
      />
      <path
        d="M23.0002 0.999999C23.0002 0.447715 23.4479 0 24.0002 0C24.5525 0 25.0002 0.447715 25.0002 1V5C25.0002 5.55229 24.5525 6 24.0002 6C23.4479 6 23.0002 5.55228 23.0002 5V0.999999Z"
        fill="url(#paint2_linear_1502_1488)"
      />
      <path
        d="M21.7927 15.2071C21.4021 15.5976 21.4021 16.2308 21.7927 16.6213L25.3282 20.1568L21.7927 23.6924C21.4021 24.0829 21.4021 24.7161 21.7927 25.1066C22.1832 25.4971 22.8163 25.4971 23.2069 25.1066L27.4487 20.8648L27.4495 20.864C27.7665 20.547 27.8262 20.0702 27.6286 19.693C27.5828 19.6055 27.5231 19.5233 27.4495 19.4497L23.2069 15.2071C22.8163 14.8166 22.1832 14.8166 21.7927 15.2071Z"
        fill="url(#paint3_linear_1502_1488)"
      />
      <path
        d="M10.0286 23.6924C10.4191 24.0829 10.4191 24.7161 10.0286 25.1066C9.63805 25.4971 9.00488 25.4971 8.61436 25.1066L4.37171 20.864C3.98119 20.4734 3.98119 19.8403 4.37171 19.4497C4.37382 19.4476 4.37594 19.4455 4.37806 19.4434C4.37939 19.4421 4.38073 19.4408 4.38206 19.4395L8.6145 15.2071C9.00502 14.8166 9.63819 14.8166 10.0287 15.2071C10.4192 15.5976 10.4192 16.2308 10.0287 16.6213L6.49311 20.1569L10.0286 23.6924Z"
        fill="url(#paint4_linear_1502_1488)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2.00004H5.99992V4.00004H4C2.89543 4.00004 2 4.89547 2 6.00004V8.00004H30V6.00004C30 4.89547 29.1046 4.00004 28 4.00004H25.9999V2.00004H28C30.2091 2.00004 32 3.7909 32 6.00004V28C32 30.2092 30.2091 32 28 32H4C1.79086 32 0 30.2092 0 28V6.00004C0 3.7909 1.79086 2.00004 4 2.00004ZM2 10H30V28C30 29.1046 29.1046 30 28 30H4C2.89543 30 2 29.1046 2 28V10Z"
        fill="url(#paint5_linear_1502_1488)"
      />
      <path
        d="M9.99992 2.00004V4.00004H13.9999V2.00004H9.99992Z"
        fill="url(#paint6_linear_1502_1488)"
      />
      <path
        d="M17.9999 4.00004H21.9999V2.00004H17.9999V4.00004Z"
        fill="url(#paint7_linear_1502_1488)"
      />
      <g filter="url(#filter0_b_1502_1488)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9956 13.5351C15.6615 13.1074 16.4725 12.9595 17.2508 13.1239C18.0287 13.2903 18.7095 13.7553 19.1439 14.4168C19.5782 15.0783 19.7307 15.8824 19.5678 16.6526L17.775 25.0872C17.6113 25.8574 17.1451 26.5303 16.479 26.9579C15.813 27.3856 15.0015 27.5329 14.2233 27.3675C13.445 27.202 12.7637 26.7374 12.3291 26.0758C11.8946 25.4143 11.7424 24.6099 11.9061 23.8397L13.6989 15.4051C13.8634 14.6353 14.3297 13.9627 14.9956 13.5351ZM18.3931 14.8991C18.0886 14.4355 17.6112 14.11 17.0659 13.9941C16.7959 13.9367 16.5173 13.9325 16.2461 13.9817C15.9749 14.0309 15.7164 14.1327 15.4853 14.281C15.2542 14.4294 15.0551 14.6215 14.8993 14.8464C14.7435 15.0713 14.6341 15.3246 14.5773 15.5918L12.7844 24.0264C12.6697 24.5661 12.7763 25.1297 13.0808 25.5932C13.3853 26.0568 13.8627 26.3823 14.408 26.4982C14.9534 26.6141 15.5219 26.5109 15.9886 26.2113C16.4553 25.9117 16.782 25.4401 16.8967 24.9005L18.6895 16.4659C18.8042 15.9263 18.6976 15.3626 18.3931 14.8991Z"
          fill="#1890FF"
        />
      </g>
      <path
        d="M18.2079 16.3134C18.0261 17.1684 17.1784 17.7127 16.3144 17.529C15.4505 17.3454 14.8974 16.5034 15.0791 15.6484C15.2609 14.7934 16.1086 14.2491 16.9726 14.4327C17.8365 14.6164 18.3896 15.4584 18.2079 16.3134Z"
        fill="#3FDCF7"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_1502_1488"
        x="-73.6103"
        y="-72.3938"
        width="178.693"
        height="185.28"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="42.7261" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_1502_1488"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1502_1488"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_1502_1488"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3FDCF7" />
        <stop offset="1" stopColor="#1890FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgRefineWeek;
