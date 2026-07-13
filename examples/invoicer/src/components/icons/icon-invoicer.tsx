import type { SVGProps } from "react";
import { useConfigProvider } from "@/providers/config-provider";

export const IconInvoicerLogo = (props: SVGProps<SVGSVGElement>) => {
  const { mode } = useConfigProvider();
  const isDarkMode = mode === "dark";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={20}
      viewBox="0 0 24 20"
      fill="none"
      {...props}
    >
      <title>Invoicer</title>
      <path
        fill={isDarkMode ? "#3E2069" : "#EFDBFF"}
        d="m0 0 24 4v12L0 20V0Z"
      />
      <path
        fill={isDarkMode ? "#CDA8F0" : "#531DAB"}
        d="M4.5 14.015 7.54 20 24 0 4.5 14.015Z"
      />
      <path
        fill={isDarkMode ? "#EBD7FA" : "#22075E"}
        d="M7.54 20v-4l2.681 1.267L7.541 20Z"
      />
      <path
        fill={isDarkMode ? "#AB7AE0" : "#9254DE"}
        d="m0 11 4.5 3.015L24 0 7.54 16 16 20l8-20L0 11Z"
      />
    </svg>
  );
};
