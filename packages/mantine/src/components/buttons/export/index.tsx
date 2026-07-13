import React from "react";
import { useExportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Button } from "@mantine/core";
import { IconFileExport } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { ExportButtonProps } from "../types";

/**
 * `<ExportButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> `} component with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
  hideText = false,
  children,
  loading = false,
  svgIconProps,
  ...rest
}) => {
  const { label } = useExportButton();

  const { variant, styles, ...commonProps } = rest;

  return hideText ? (
    <ActionIcon
      {...(variant
        ? {
            variant: mapButtonVariantToActionIconVariant(variant),
          }
        : { variant: "default" })}
      loading={loading}
      aria-label={label}
      data-testid={RefineButtonTestIds.ExportButton}
      className={RefineButtonClassNames.ExportButton}
      {...commonProps}
    >
      <IconFileExport size={18} {...svgIconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant="default"
      loading={loading}
      leftIcon={<IconFileExport size={18} {...svgIconProps} />}
      data-testid={RefineButtonTestIds.ExportButton}
      className={RefineButtonClassNames.ExportButton}
      {...rest}
    >
      {children ?? label}
    </Button>
  );
};
