import React from "react";

export const MeetIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      className="text-white dark:text-refine-pink/10"
    />
    <rect
      width="40"
      height="40"
      rx="20"
      fill="currentColor"
      className="text-refine-pink"
      fillOpacity="0.1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.5312 12.4687C27.1104 12.0478 26.4907 11.8953 25.9226 12.0729L13.1228 16.0729C12.5153 16.2627 12.0781 16.7946 12.0094 17.4273C11.9407 18.0601 12.2536 18.6734 12.8062 18.9892C12.8155 18.9945 12.825 18.9997 12.8345 19.0046L18.2066 21.7933L20.9953 27.1655C21.0003 27.175 21.0054 27.1845 21.0107 27.1938C21.3265 27.7464 21.9398 28.0593 22.5726 27.9906C23.2054 27.9219 23.7372 27.4847 23.9271 26.8772L27.927 14.0773C28.1046 13.5092 27.9521 12.8895 27.5312 12.4687ZM18.6485 20.22L13.6009 17.5997L26.3999 13.6L22.4002 26.3991L19.7799 21.3514L22.1656 18.9657C22.478 18.6533 22.478 18.1467 22.1656 17.8343C21.8532 17.5219 21.3467 17.5219 21.0342 17.8343L18.6485 20.22Z"
      fill="currentColor"
      className="text-refine-pink"
    />
  </svg>
);
