import React from "react";
import { FaBook } from "react-icons/fa6";
import { InfoBadge } from "../info-badge";

type Props = {
  id: string;
  description: string;
  text?: string;
};

export const GuideBadge = ({
  id,
  description = "Please check the guide for more information on this topic.",
  text,
}: Props) => {
  return (
    <InfoBadge
      id={id}
      color="green"
      icon={<GuideIcon />}
      text={text}
      description={
        <>
          <div className="text-xs font-semibold mb-1">
            {text ?? "Check the guide"}
          </div>
          <div className="text-xs">{description}</div>
        </>
      }
    />
  );
};

const GuideIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={28}
    viewBox="0 0 29 28"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11 13a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7ZM10.5 15.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM11 11a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.5 10.8A4.8 4.8 0 0 1 11.3 6h6.4a4.8 4.8 0 0 1 4.8 4.8v6.4a4.8 4.8 0 0 1-4.8 4.8h-6.4a4.8 4.8 0 0 1-4.8-4.8v-6.4ZM11.3 7h6.4a3.8 3.8 0 0 1 3.8 3.8v6.4a3.8 3.8 0 0 1-3.8 3.8h-6.4a3.8 3.8 0 0 1-3.8-3.8v-6.4A3.8 3.8 0 0 1 11.3 7Z"
      clipRule="evenodd"
    />
  </svg>
);
