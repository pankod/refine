import type { SVGProps } from "react";

export const CloseRectancleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10 6-4 4m4 0L6 6"
      />
      <path
        stroke="currentColor"
        d="M1.667 8c0-2.986 0-4.479.927-5.406.928-.928 2.42-.928 5.406-.928 2.986 0 4.478 0 5.406.928.927.927.927 2.42.927 5.405 0 2.986 0 4.479-.927 5.406-.928.928-2.42.928-5.406.928-2.986 0-4.478 0-5.406-.928-.927-.927-.927-2.42-.927-5.406Z"
      />
    </svg>
  );
};
