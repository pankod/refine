import React from "react";
import { Anchor } from "@mantine/core";

import type { UrlFieldProps } from "../types";

/**
 * This field is used to display email values. It uses the {@link https://mantine.dev/core/text `<Text>` }
 * and {@link https://mantine.dev/core/anchor <Anchor>`} components from Mantine.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/url} for more details.
 */
export const UrlField: React.FC<UrlFieldProps> = ({
  children,
  value,
  title,
  ...rest
}) => {
  return (
    <Anchor href={value} title={title} {...rest}>
      {children ?? value}
    </Anchor>
  );
};
