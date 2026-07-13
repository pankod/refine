import React from "react";
import { useLocation } from "@docusaurus/router";
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useVersionLinks from "../hooks/use-version-links";

export const DocVersionTabs = () => {
  const docContext = useActiveDocContext();
  const { links } = useVersionLinks();

  return (
    <div>
      {links.map((version) => {
        const isActive = version.label === docContext.activeVersion.label;

        return (
          <Link
            key={version.label}
            to={version.to}
            className={clsx("py-[4px] px-3", "rounded", {
              "hover:text-white text-white": isActive,
              "dark:text-zinc-500": !isActive,
              "bg-zinc-600": isActive,
              "bg-transparent": isActive,
              "hover:brightness-110": !isActive,
            })}
          >
            {version.label}
          </Link>
        );
      })}
    </div>
  );
};
