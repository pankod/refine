import type { SVGProps } from "react";

export const CasualLeaveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 22H6.59c-1.545 0-2.774-.752-3.877-1.803-2.26-2.153 1.45-3.873 2.865-4.715 2.1-1.251 4.559-1.71 6.922-1.377"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M15.5 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM19.545 16.453C21.182 17.337 22 17.78 22 18.5c0 .721-.818 1.163-2.455 2.047l-1.114.601c-1.257.68-1.885 1.018-2.187.772-.74-.605.413-2.164.696-2.716.287-.56.282-.858 0-1.408-.284-.552-1.436-2.111-.696-2.715.302-.247.93.092 2.187.77l1.114.602Z"
    />
  </svg>
);
