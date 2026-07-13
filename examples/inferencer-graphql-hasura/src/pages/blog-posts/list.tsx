import { AntdListInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const BlogPostList = () => {
  return <AntdListInferencer meta={inferencerPredefinedMeta} />;
};
