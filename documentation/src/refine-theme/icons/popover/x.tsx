import React from "react";
import { useColorMode } from "@docusaurus/theme-common";

export const XIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={colorMode === "dark" ? "#fff" : "#000"}
        fillRule="evenodd"
        d="m0 0 9.24 13.5L.197 24H2.2l7.926-9.207L16.428 24H24L14.346 9.897 22.866 0h-1.999L13.46 8.6 7.572 0H0Zm2.393 1.263h4.515l14.699 21.474h-4.515L2.393 1.263Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
