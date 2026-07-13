import { AntdListInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const CategoryList = () => {
  return <AntdListInferencer meta={inferencerPredefinedMeta} />;
};
