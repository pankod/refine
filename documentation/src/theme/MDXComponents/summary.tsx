import { useLocation } from "@docusaurus/router";
import React from "react";

import BlogSummary from "@site/src/refine-theme/blog-summary";
import CommonSummary from "@site/src/refine-theme/common-summary";
import { isBlogRoute } from "@site/src/utils/is-blog-route";

export default function Summary(props: any) {
  const { pathname = "" } = useLocation();
  const isBlogPage = isBlogRoute(pathname);

  if (isBlogPage) {
    return <BlogSummary {...props} />;
  }

  return <CommonSummary {...props} />;
}
