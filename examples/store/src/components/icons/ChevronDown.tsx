import type { IconProps } from "src/types/icon";

export const ChevronDown: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
};
