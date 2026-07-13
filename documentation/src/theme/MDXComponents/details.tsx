import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogDetails from "@site/src/refine-theme/blog-details";
import CommonDetails from "@site/src/refine-theme/common-details";
import { isBlogRoute } from "@site/src/utils/is-blog-route";

export default function Details(props: any) {
  const { pathname = "" } = useLocation();
  const isBlogPage = isBlogRoute(pathname);

  if (isBlogPage) {
    return <BlogDetails {...props} />;
  }

  return <CommonDetails {...props} />;
}
