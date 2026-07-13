import React from "react";
import { Text } from "@chakra-ui/react";

import type { NumberFieldProps } from "../types";

function toLocaleStringSupportsOptions() {
  return !!(
    typeof Intl === "object" &&
    Intl &&
    typeof Intl.NumberFormat === "function"
  );
}
/**
 * This field is used to display a number formatted according to the browser locale, right aligned. and uses {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl `Intl`} to display date format
 * and Chakra UI {@link https://chakra-ui.com/docs/components/text  `<Text>`} component.
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/fields/number} for more details.
 */
export const NumberField: React.FC<NumberFieldProps> = ({
  value,
  locale,
  options,
  ...rest
}) => {
  const number = Number(value);

  return (
    <Text {...rest}>
      {toLocaleStringSupportsOptions()
        ? number.toLocaleString(locale, options)
        : number}
    </Text>
  );
};
