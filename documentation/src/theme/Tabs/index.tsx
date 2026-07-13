import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogTabs from "@site/src/refine-theme/blog-tabs";
import CommonTabs from "@site/src/refine-theme/common-tabs";
import { isBlogRoute } from "@site/src/utils/is-blog-route";

export default function Tabs(props) {
  const { pathname = "" } = useLocation();
  const isBlogPage = isBlogRoute(pathname);

  if (isBlogPage) {
    return <BlogTabs {...props} />;
  }

  return <CommonTabs {...props} />;
}
