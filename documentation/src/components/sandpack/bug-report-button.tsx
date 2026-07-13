import { RoundedButton } from "@codesandbox/sandpack-react";
import clsx from "clsx";
import React from "react";

type Props = {
  onClick?: () => void;
};

export const BugReportButton = ({ onClick }: Props) => {
  return (
    <RoundedButton className={clsx()} onClick={onClick} title="Report Issue">
      <BugIcon />
    </RoundedButton>
  );
};

const BugIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 512 512"
    {...props}
  >
    <title>Report issue</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M370 378c28.89 23.52 46 46.07 46 86m-274-86c-28.89 23.52-46 46.06-46 86m288-256c28.89-23.52 32-56.07 32-96m-288 94c-28.89-23.52-32-54.06-32-94m368 176.13h-80m-256 0H48M256 192v256"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M256 448h0c-70.4 0-128-57.6-128-128v-96.07c0-65.07 57.6-96 128-96h0c70.4 0 128 25.6 128 96V320c0 70.4-57.6 128-128 128z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M179.43 143.52a49.08 49.08 0 0 1-3.43-15.73A80 80 0 0 1 255.79 48h.42A80 80 0 0 1 336 127.79a41.91 41.91 0 0 1-3.12 14.3"
    />
  </svg>
);
