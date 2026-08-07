import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogTabItem from "@site/src/refine-theme/blog-tab-item";
import CommonTabItem from "@site/src/refine-theme/common-tab-item";
import { isBlogRoute } from "@site/src/utils/is-blog-route";

export default function TabItem(props) {
  const { pathname = "" } = useLocation();
  const isBlogPage = isBlogRoute(pathname);

  if (isBlogPage) {
    return <BlogTabItem {...props} />;
  }

  return <CommonTabItem {...props} />;
}
