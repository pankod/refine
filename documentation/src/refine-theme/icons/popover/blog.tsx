import clsx from "clsx";
import React from "react";

export const BlogIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
    className={clsx(
      "dark:text-refine-yellow text-refine-orange",
      props.className,
    )}
  >
    <rect
      width={40}
      height={40}
      fill="currentColor"
      fillOpacity={0.1}
      rx={20}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M24.663 12c-.614 0-1.229.234-1.697.703l-9.932 9.931a.8.8 0 0 0-.218.41l-.8 4a.8.8 0 0 0 .94.94l4-.8a.8.8 0 0 0 .41-.218l9.931-9.932A2.392 2.392 0 0 0 28 15.337c0-.614-.234-1.228-.703-1.697l-.937-.937A2.392 2.392 0 0 0 24.663 12Zm-.566 1.834a.8.8 0 0 1 1.131 0l.938.938a.8.8 0 0 1 0 1.13l-1.503 1.504-2.069-2.069 1.503-1.503Zm-2.634 2.635 2.068 2.068-7.125 7.126-2.586.517.517-2.586 7.126-7.125Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M20.2 26.4a.8.8 0 1 0 0 1.6h7a.8.8 0 0 0 0-1.6h-7Z"
    />
  </svg>
);
