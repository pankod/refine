import React from "react";
import { Link } from "@chakra-ui/react";

import type { UrlFieldProps } from "../types";

/**
 * This field is used to display email values. It uses the {@link https://chakra-ui.com/docs/components/text  `<Text>` } component from Chakra UI.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/fields/url} for more details.
 */
export const UrlField: React.FC<UrlFieldProps> = ({
  children,
  value,
  title,
  ...rest
}) => {
  return (
    <Link href={value} title={title} {...rest}>
      {children ?? value}
    </Link>
  );
};
