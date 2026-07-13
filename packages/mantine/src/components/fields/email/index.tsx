import React from "react";
import { Anchor } from "@mantine/core";

import type { EmailFieldProps } from "../types";

/**
 * This field is used to display email values. It uses the {@link https://mantine.dev/core/text `<Text>` }
 * and {@link https://mantine.dev/core/anchor <Anchor>`} components from Mantine.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/email} for more details.
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
  return (
    <Anchor href={`mailto:${value}`} {...rest}>
      {value}
    </Anchor>
  );
};
