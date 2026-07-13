import * as React from "react";
import type { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { RefineLogoShinyCyan } from "./refine-logo-shiny-cyan";
import { RefineLogoShinyBlue } from "./refine-logo-shiny-blue";

export const RefineLogoShiny = (props: SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();

  if (colorMode === "dark") {
    return <RefineLogoShinyCyan {...props} />;
  }

  return <RefineLogoShinyBlue {...props} />;
};
