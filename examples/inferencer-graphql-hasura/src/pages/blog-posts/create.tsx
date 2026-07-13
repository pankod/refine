import { AntdCreateInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const BlogPostCreate = () => {
  return <AntdCreateInferencer meta={inferencerPredefinedMeta} />;
};
