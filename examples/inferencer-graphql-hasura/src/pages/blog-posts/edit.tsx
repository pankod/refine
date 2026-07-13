import { AntdEditInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const BlogPostEdit = () => {
  return <AntdEditInferencer meta={inferencerPredefinedMeta} />;
};
