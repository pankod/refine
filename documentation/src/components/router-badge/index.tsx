import React from "react";
import { FaRoute } from "react-icons/fa6";
import { InfoBadge } from "../info-badge";

type Props = {
  id: string;
  description: string;
  text?: string;
};

export const RouterBadge = ({
  id = "guides-concepts/routing/",
  description = "This value can be inferred from the route. Click to see the guide for more information.",
  text,
}: Props) => {
  return (
    <InfoBadge
      id={id}
      color="orange"
      text={text}
      icon={<RoutingIcon />}
      description={
        <>
          <div className="text-xs font-semibold mb-1">
            {text ?? "Router Integrated"}
          </div>
          <div className="text-xs">{description}</div>
        </>
      }
    />
  );
};

const RoutingIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      fillRule="evenodd"
      d="M15.55 8h-4.492a2.558 2.558 0 0 0-.874 4.963l8.29 3.014A1.558 1.558 0 0 1 17.942 19H13.45a2.5 2.5 0 1 0 0 1h4.492a2.558 2.558 0 0 0 .874-4.963l-8.29-3.014A1.558 1.558 0 0 1 11.058 9h4.492a2.5 2.5 0 1 0 0-1ZM18 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-7 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
      clipRule="evenodd"
    />
  </svg>
);
