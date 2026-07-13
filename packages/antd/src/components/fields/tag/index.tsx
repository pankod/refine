import React from "react";
import { Tag } from "antd";

import type { TagFieldProps } from "../types";

/**
 * This field lets you display a value in a tag. It uses Ant Design's {@link https://ant.design/components/tag/ `<Tag>`} component.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/fields/tag} for more details.
 */
export const TagField: React.FC<TagFieldProps> = ({ value, ...rest }) => {
  return <Tag {...rest}>{value?.toString()}</Tag>;
};
