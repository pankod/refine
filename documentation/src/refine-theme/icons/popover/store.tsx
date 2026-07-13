import React from "react";

export const StoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M18.4 16.7998C18.4 16.358 18.0418 15.9998 17.6 15.9998C17.1582 15.9998 16.8 16.358 16.8 16.7998C16.8 18.5671 18.2327 19.9998 20 19.9998C21.7673 19.9998 23.2 18.5671 23.2 16.7998C23.2 16.358 22.8418 15.9998 22.4 15.9998C21.9582 15.9998 21.6 16.358 21.6 16.7998C21.6 17.6835 20.8837 18.3998 20 18.3998C19.1163 18.3998 18.4 17.6835 18.4 16.7998Z"
      fill="currentColor"
      className="dark:text-refine-green-alt text-refine-green"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2007 12.7998C15.0458 12.7998 14.0547 13.6224 13.8418 14.7575L12.0418 24.3575C12.0139 24.5065 12.0003 24.6544 12 24.7998C11.9973 26.0961 13.0496 27.1998 14.4007 27.1998H25.5993C26.9504 27.1998 28.0027 26.0961 28 24.7998C27.9997 24.6544 27.9861 24.5065 27.9582 24.3575L26.1582 14.7575C25.9453 13.6224 24.9542 12.7998 23.7993 12.7998H16.2007ZM15.4144 15.0524C15.4854 14.674 15.8158 14.3998 16.2007 14.3998H23.7993C24.1842 14.3998 24.5146 14.674 24.5856 15.0524L26.3856 24.6524C26.4779 25.1447 26.1002 25.5998 25.5993 25.5998H14.4007C13.8998 25.5998 13.5221 25.1447 13.6144 24.6524L15.4144 15.0524Z"
      fill="currentColor"
      className="dark:text-refine-green-alt text-refine-green"
    />
  </svg>
);
