import React from "react";
import { Image } from "antd";

import type { ImageFieldProps } from "../types";

/**
 * This field is used to display images and uses {@link https://ant.design/components/image/#header `<Image>`} from Ant Design.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/fields/image} for more details.
 */
export const ImageField: React.FC<ImageFieldProps> = ({
  value,
  imageTitle,
  ...rest
}) => {
  return <Image {...rest} src={value} title={imageTitle} />;
};
