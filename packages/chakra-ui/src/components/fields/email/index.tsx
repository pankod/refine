import React from "react";
import { Link } from "@chakra-ui/react";

import type { EmailFieldProps } from "../types";

/**
 * This field is used to display email values. It uses the {@link https://chakra-ui.com/docs/components/text  `<Text>` }
 * and {@link https://www.chakra-ui.com/docs/components/link <Link>`} components from Chakra UI.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/fields/email} for more details.
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
  return (
    <Link href={`mailto:${value}`} {...rest}>
      {value}
    </Link>
  );
};
