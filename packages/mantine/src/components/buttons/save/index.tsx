import React from "react";
import { useSaveButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Button } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { SaveButtonProps } from "../types";

/**
 * `<SaveButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> `}.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/save-button} for more details.
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
  hideText = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useSaveButton();

  const { variant, styles, ...commonProps } = rest;

  return hideText ? (
    <ActionIcon
      {...(variant
        ? {
            variant: mapButtonVariantToActionIconVariant(variant),
          }
        : { variant: "filled", color: "primary" })}
      aria-label={label}
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      {...commonProps}
    >
      <IconDeviceFloppy size={18} {...svgIconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant="filled"
      leftIcon={<IconDeviceFloppy size={18} {...svgIconProps} />}
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      {...rest}
    >
      {children ?? label}
    </Button>
  );
};
