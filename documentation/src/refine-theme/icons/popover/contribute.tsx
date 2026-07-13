import React from "react";

export const ContributeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      width="40"
      height="40"
      rx="20"
      fill="currentColor"
      className="text-white dark:text-refine-green/20"
    />
    <rect
      width="40"
      height="40"
      rx="20"
      fill="currentColor"
      className="text-refine-green"
      fillOpacity="0.1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 14.4C12 13.0745 13.0745 12 14.4 12H25.6C26.9255 12 28 13.0745 28 14.4V21.6C28 22.9255 26.9255 24 25.6 24H24.8V25.6C24.8 26.9255 23.7255 28 22.4 28H17.6C16.2745 28 15.2 26.9255 15.2 25.6V24H14.4C13.0745 24 12 22.9255 12 21.6V14.4ZM15.2 22.4V18C15.2 16.4536 16.4536 15.2 18 15.2C19.5464 15.2 20.8 16.4536 20.8 18V19.4584L23.2913 20.4549C24.1139 20.7839 24.6808 21.5351 24.7833 22.4H25.6C26.0418 22.4 26.4 22.0418 26.4 21.6V14.4C26.4 13.9582 26.0418 13.6 25.6 13.6H14.4C13.9582 13.6 13.6 13.9582 13.6 14.4V21.6C13.6 22.0418 13.9582 22.4 14.4 22.4H15.2ZM18 16.8C17.3373 16.8 16.8 17.3373 16.8 18V25.6C16.8 26.0418 17.1582 26.4 17.6 26.4H22.4C22.8418 26.4 23.2 26.0418 23.2 25.6V22.6833C23.2 22.3561 23.0008 22.062 22.6971 21.9405L19.7029 20.7428C19.3992 20.6213 19.2 20.3271 19.2 20V18C19.2 17.3373 18.6627 16.8 18 16.8Z"
      fill="currentColor"
      className="text-refine-green"
    />
  </svg>
);
