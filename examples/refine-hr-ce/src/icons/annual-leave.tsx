import type { SVGProps } from "react";

export const AnnualLeaveIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 15.75S3.795 15 7 15c5 0 9 3 15 3M2 21h20M12.594 3.228c-2.846.816-4.695 3.624-4.59 6.647.022.628.033.942.301 1.08.269.14.547-.057 1.104-.45l1.241-.878a.982.982 0 0 1 .631-.181l2.917.187 2.438-1.722a.982.982 0 0 1 .63-.181l1.522.097c.653.042.979.063 1.141-.188.162-.251.03-.523-.233-1.066-1.31-2.703-4.24-4.166-7.102-3.345ZM14.5 9.5l2 7.5M12.286 3 12 2"
    />
  </svg>
);
