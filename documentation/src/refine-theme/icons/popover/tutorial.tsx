import React from "react";

export const TutorialIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      className="text-white dark:text-refine-green-alt/10"
    />
    <rect
      width="40"
      height="40"
      rx="20"
      fill="currentColor"
      className="dark:text-refine-green-alt text-refine-green"
      fillOpacity="0.1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.8 12.8C20.8 12.3582 20.4418 12 20 12C19.5582 12 19.2 12.3582 19.2 12.8V13.6H14.4C13.0745 13.6 12 14.6745 12 16V21.6C12 22.9255 13.0745 24 14.4 24H16.4686L14.6343 25.8343C14.3219 26.1467 14.3219 26.6533 14.6343 26.9657C14.9467 27.2781 15.4533 27.2781 15.7657 26.9657L18.7314 24H19.2V27.2C19.2 27.6418 19.5582 28 20 28C20.4418 28 20.8 27.6418 20.8 27.2V24H21.2686L24.2343 26.9657C24.5467 27.2781 25.0533 27.2781 25.3657 26.9657C25.6781 26.6533 25.6781 26.1467 25.3657 25.8343L23.5314 24H25.6C26.9255 24 28 22.9255 28 21.6V16C28 14.6745 26.9255 13.6 25.6 13.6H20.8V12.8ZM25.6 22.4C26.0418 22.4 26.4 22.0418 26.4 21.6V16C26.4 15.5582 26.0418 15.2 25.6 15.2H14.4C13.9582 15.2 13.6 15.5582 13.6 16V21.6C13.6 22.0418 13.9582 22.4 14.4 22.4H25.6Z"
      fill="currentColor"
      className="dark:text-refine-green-alt text-refine-green"
    />
  </svg>
);
