import React from "react";
import { Text } from "@chakra-ui/react";

import type { TextFieldProps } from "../types";

/**
 * This field lets you show basic text. It uses Chakra UI {@link https://chakra-ui.com/docs/components/text  `<Text>`} component.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/fields/text} for more details.
 */
export const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
  return <Text {...rest}>{value}</Text>;
};
