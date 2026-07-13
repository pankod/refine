import React from "react";

export const HorizontalDotsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={4}
    viewBox="0 0 16 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 2C4 3.10455 3.10455 4 2 4C0.895447 4 0 3.10455 0 2C0 0.895447 0.895447 0 2 0C3.10455 0 4 0.895447 4 2Z"
      fill="currentColor"
    />
    <path
      d="M10 2C10 3.10455 9.10455 4 8 4C6.89545 4 6 3.10455 6 2C6 0.895447 6.89545 0 8 0C9.10455 0 10 0.895447 10 2Z"
      fill="currentColor"
    />
    <path
      d="M14 4C15.1046 4 16 3.10455 16 2C16 0.895447 15.1046 0 14 0C12.8954 0 12 0.895447 12 2C12 3.10455 12.8954 4 14 4Z"
      fill="currentColor"
    />
  </svg>
);
