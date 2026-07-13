import type { SVGProps } from "react";

export const IconQuestionMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={18}
    viewBox="0 0 12 18"
    fill="none"
    {...props}
  >
    <title>Question Mark</title>
    <path
      fill="currentColor"
      d="M0 6V2h2V0h8v2h2v4h-2v2H8v4H4V8h2V6h2V2H4v4H0ZM8 14H4v4h4v-4Z"
    />
  </svg>
);
