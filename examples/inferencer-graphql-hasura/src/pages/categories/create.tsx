import { AntdCreateInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const CategoryCreate = () => {
  return <AntdCreateInferencer meta={inferencerPredefinedMeta} />;
};
