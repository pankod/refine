import type { SVGProps } from "react";

export const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    strokeWidth={1.5}
    {...props}
  >
    <path
      stroke="#B91C1C"
      strokeLinecap="round"
      d="M10 11.75c-.05 1.235-1.078 2.283-2.456 2.25-.32-.009-.717-.12-1.51-.344-1.908-.538-3.564-1.443-3.961-3.468C2 9.815 2 9.396 2 8.558V7.442c0-.838 0-1.257.073-1.63.397-2.026 2.053-2.93 3.961-3.468.793-.224 1.19-.335 1.51-.343C8.922 1.967 9.95 3.015 10 4.25"
    />
    <path
      stroke="#B91C1C"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 8H6.667M14 8c0-.467-1.33-1.339-1.667-1.667M14 8c0 .467-1.33 1.339-1.667 1.667"
    />
  </svg>
);
