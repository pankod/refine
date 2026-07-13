import React from "react";
import Link from "@docusaurus/Link";
import { getLinkRel } from "@site/src/utils/link-rel";
import { useLocation } from "@docusaurus/router";

export default function MDXA(props) {
  const rel = getLinkRel(props?.href);

  const location = useLocation();

  return (
    <Link
      {...props}
      rel={rel}
      {...(location.pathname.startsWith("/tutorial/") &&
      !props.href.startsWith("#")
        ? {
            target: "_blank",
          }
        : {})}
    />
  );
}
