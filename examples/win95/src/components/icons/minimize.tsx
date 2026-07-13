import type { SVGProps } from "react";

export const IconMinimize = (props: SVGProps<SVGSVGElement>) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-start",
      width: "16px",
      height: "16px",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={4}
      viewBox="0 0 12 4"
      fill="none"
      {...props}
    >
      <title>Minimize</title>
      <path fill="#000" d="M12 0v4H0V0h12Z" />
    </svg>
  </div>
);
