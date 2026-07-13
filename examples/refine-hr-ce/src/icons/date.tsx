import type { SVGProps } from "react";

export const DateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 1.334v1.333M4 1.334v1.333"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.667 8.667c0-.369.298-.667.667-.667h.006a.667.667 0 0 1 0 1.333h-.006a.667.667 0 0 1-.667-.666Zm2.664 0c0-.369.298-.667.666-.667h.006a.667.667 0 0 1 0 1.333h-.006a.667.667 0 0 1-.666-.666Zm2.663 0c0-.369.299-.667.667-.667h.006a.667.667 0 1 1 0 1.333h-.006a.667.667 0 0 1-.667-.666Zm-5.327 2.666c0-.368.298-.666.667-.666h.006a.667.667 0 1 1 0 1.333h-.006a.667.667 0 0 1-.667-.667Zm2.664 0c0-.368.298-.666.666-.666h.006a.667.667 0 1 1 0 1.333h-.006a.667.667 0 0 1-.666-.667Z"
      clipRule="evenodd"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.333 5.334h11.333M1.667 8.162c0-2.905 0-4.357.835-5.26C3.336 2 4.68 2 7.367 2h1.267c2.687 0 4.03 0 4.865.902.835.903.835 2.355.835 5.26v.343c0 2.904 0 4.357-.835 5.26-.835.902-2.178.902-4.865.902H7.367c-2.687 0-4.03 0-4.865-.903-.835-.902-.835-2.355-.835-5.26v-.342ZM2 5.334h12"
    />
  </svg>
);
