import React from "react";

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.39 3.86a.375.375 0 1 0-.53.53L5.47 6 3.86 7.61a.375.375 0 0 0 .53.53L6 6.53l1.61 1.61a.375.375 0 0 0 .53-.53L6.53 6l1.61-1.61a.375.375 0 1 0-.53-.53L6 5.47 4.39 3.86Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 6A6 6 0 1 1 0 6a6 6 0 0 1 12 0Zm-.75 0A5.25 5.25 0 1 1 .75 6a5.25 5.25 0 0 1 10.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
