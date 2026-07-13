import * as React from "react";
import type { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { NewBadgeShinyCyan } from "./new-badge-shiny-cyan";
import { NewBadgeShinyBlue } from "./new-badge-shiny-blue";

export const NewBadgeShiny = (props: SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();

  if (colorMode === "dark") {
    return <NewBadgeShinyCyan {...props} />;
  }

  return <NewBadgeShinyBlue {...props} />;
};
