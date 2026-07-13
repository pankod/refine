import { AntdEditInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const CategoryEdit = () => {
  return <AntdEditInferencer meta={inferencerPredefinedMeta} />;
};
