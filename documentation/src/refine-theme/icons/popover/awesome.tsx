import React from "react";

export const AwesomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      className="text-white dark:text-refine-cyan-alt/10"
    />
    <rect
      width="40"
      height="40"
      rx="20"
      fill="currentColor"
      className="dark:text-refine-cyan-alt text-refine-cyan"
      fillOpacity="0.1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6656 15.6437C16.9107 15.2761 16.8114 14.7794 16.4438 14.5343C16.0761 14.2893 15.5794 14.3886 15.3344 14.7562L12.1404 19.5471C12.0532 19.6739 12.0016 19.827 12 19.9922C12 19.9948 12 19.9974 12 20V23.2C12 24.5255 13.0745 25.6 14.4 25.6H17.2468C18.2798 25.6 19.197 24.939 19.5236 23.9589L20 22.5298L20.4764 23.9589C20.803 24.939 21.7202 25.6 22.7532 25.6H25.6C26.9255 25.6 28 24.5255 28 23.2V20.0012C28 19.9982 28 19.9952 28 19.9922C27.9985 19.8396 27.9534 19.6878 27.8656 19.5562L24.6656 14.7562C24.4206 14.3886 23.9239 14.2893 23.5562 14.5343C23.1886 14.7794 23.0893 15.2761 23.3344 15.6437L25.7052 19.2H14.2948L16.6656 15.6437ZM18.8901 20.8H13.6V23.2C13.6 23.6418 13.9582 24 14.4 24H17.2468C17.5911 24 17.8968 23.7796 18.0057 23.453L18.8901 20.8ZM21.1099 20.8H26.4V23.2C26.4 23.6418 26.0418 24 25.6 24H22.7532C22.4089 24 22.1032 23.7796 21.9943 23.453L21.1099 20.8Z"
      fill="currentColor"
      className="dark:text-refine-cyan-alt text-refine-cyan"
    />
  </svg>
);
