import React from "react";
import { Tooltip } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";

import type { BooleanFieldProps } from "../types";

/**
 * This field is used to display boolean values. It uses the {@link https://mantine.dev/core/tooltip `<Tooltip>`} values from Mantine.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/boolean} for more details.
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
          ? trueIcon ?? <IconCheck size={18} {...svgIconProps} />
          : falseIcon ?? <IconX size={18} {...svgIconProps} />}
      </span>
    </Tooltip>
  );
};
