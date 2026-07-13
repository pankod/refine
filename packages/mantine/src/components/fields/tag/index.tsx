import React from "react";
import { Chip } from "@mantine/core";

import type { TagFieldProps } from "../types";

/**
 * This field lets you display a value in a tag. It uses Mantine {@link https://mantine.dev/core/chip `<Chip>`} component.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/tag} for more details.
 */
export const TagField: React.FC<TagFieldProps> = ({ value, ...rest }) => {
  return (
    <Chip checked={false} {...rest}>
      {value?.toString()}
    </Chip>
  );
};
