import React from "react";

export const HackathonsIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      className="text-white dark:text-refine-yellow/10"
    />
    <rect
      width="40"
      height="40"
      rx="20"
      fill="currentColor"
      className="text-refine-yellow"
      fillOpacity="0.1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.4 13.6C14.4 12.7163 15.1163 12 16 12H24C24.8837 12 25.6 12.7163 25.6 13.6V19.2C25.6 22.0212 23.5138 24.3551 20.8 24.7433V26.4H23.2C23.6418 26.4 24 26.7582 24 27.2C24 27.6418 23.6418 28 23.2 28H16.8C16.3582 28 16 27.6418 16 27.2C16 26.7582 16.3582 26.4 16.8 26.4H19.2V24.7433C16.4862 24.3551 14.4 22.0212 14.4 19.2V13.6ZM24 19.2C24 21.4091 22.2091 23.2 20 23.2C17.7909 23.2 16 21.4091 16 19.2V13.6L24 13.6V19.2Z"
      fill="currentColor"
      className="text-refine-yellow"
    />
    <path
      d="M13.6 14.4C13.6 13.9582 13.2418 13.6 12.8 13.6C12.3582 13.6 12 13.9582 12 14.4V19.2C12 19.6418 12.3582 20 12.8 20C13.2418 20 13.6 19.6418 13.6 19.2V14.4Z"
      fill="currentColor"
      className="text-refine-yellow"
    />
    <path
      d="M28 14.4C28 13.9582 27.6418 13.6 27.2 13.6C26.7582 13.6 26.4 13.9582 26.4 14.4V19.2C26.4 19.6418 26.7582 20 27.2 20C27.6418 20 28 19.6418 28 19.2V14.4Z"
      fill="currentColor"
      className="text-refine-yellow"
    />
  </svg>
);
