import React from "react";
import { FaGear } from "react-icons/fa6";
import { InfoBadge } from "../info-badge";

type Props = {
  id: string;
  description: string;
  text?: string;
};

export const GlobalConfigBadge = ({
  id = "core/refine-component",
  description = "This value can be configured globally. Click to see the guide for more information.",
  text,
}: Props) => {
  return (
    <InfoBadge
      color="purple"
      icon={<ConfigIcon />}
      text={text}
      id={id}
      description={
        <>
          <div className="text-xs font-semibold mb-1">
            {text ?? "Globally Configurable"}
          </div>
          <div className="text-xs">{description}</div>
        </>
      }
    />
  );
};

const ConfigIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M17.5 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-1 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m16.728 6.684.73 2.192 2.264-.464a1 1 0 0 1 1.067.48l1.279 2.216a1 1 0 0 1-.118 1.163L20.417 14l1.533 1.729a1 1 0 0 1 .118 1.163l-1.28 2.216a1 1 0 0 1-1.066.48l-2.263-.464-.731 2.192a1 1 0 0 1-.949.684h-2.558a1 1 0 0 1-.949-.684l-.73-2.192-2.264.464a1 1 0 0 1-1.067-.48l-1.279-2.216a1 1 0 0 1 .118-1.163L8.583 14 7.05 12.271a1 1 0 0 1-.118-1.163l1.28-2.216a1 1 0 0 1 1.066-.48l2.263.464.731-2.192A1 1 0 0 1 13.221 6h2.558a1 1 0 0 1 .949.684Zm-.218 2.508a1 1 0 0 0 1.15.663l2.263-.463 1.279 2.216-1.533 1.728a1 1 0 0 0 0 1.328l1.533 1.728-1.28 2.216-2.263-.463a1 1 0 0 0-1.15.663L15.78 21h-2.558l-.73-2.192a1 1 0 0 0-1.15-.663l-2.264.463-1.279-2.216 1.533-1.728a1 1 0 0 0 0-1.328l-1.533-1.728 1.28-2.216 2.263.463a1 1 0 0 0 1.15-.663L13.22 7h2.558l.73 2.192Z"
      clipRule="evenodd"
    />
  </svg>
);
