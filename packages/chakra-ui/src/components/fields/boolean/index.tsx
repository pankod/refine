import React from "react";
import { Tooltip } from "@chakra-ui/react";
import { IconMinus, IconCheck } from "@tabler/icons-react";

import type { BooleanFieldProps } from "../types";

/**
 * This field is used to display boolean values. It uses the {@link https://chakra-ui.com/docs/components/tooltip `<Tooltip>`} values from Chakra UI.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/fields/boolean} for more details.
 */
export const BooleanField: React.FC<BooleanFieldProps> = ({
  value,
  valueLabelTrue = "true",
  valueLabelFalse = "false",
  trueIcon,
  falseIcon,
  svgIconProps,
  ...rest
}) => {
  return (
    <Tooltip label={value ? valueLabelTrue : valueLabelFalse} {...rest}>
      <span>
        {value
          ? trueIcon ?? <IconCheck size={20} {...svgIconProps} />
          : falseIcon ?? <IconMinus size={20} {...svgIconProps} />}
      </span>
    </Tooltip>
  );
};
