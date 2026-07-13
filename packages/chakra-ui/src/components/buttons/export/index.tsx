import React from "react";
import { useExportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconFileExport } from "@tabler/icons-react";

import type { ExportButtonProps } from "../types";

/**
 * `<ExportButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
  hideText = false,
  children,
  loading = false,
  svgIconProps,
  ...rest
}) => {
  const { label } = useExportButton();

  return hideText ? (
    <IconButton
      variant="outline"
      aria-label={label}
      isLoading={loading}
      data-testid={RefineButtonTestIds.ExportButton}
      className={RefineButtonClassNames.ExportButton}
      {...rest}
    >
      <IconFileExport size={20} {...svgIconProps} />
    </IconButton>
  ) : (
    <Button
      variant="outline"
      isLoading={loading}
      leftIcon={<IconFileExport size={20} {...svgIconProps} />}
      data-testid={RefineButtonTestIds.ExportButton}
      className={RefineButtonClassNames.ExportButton}
      {...rest}
    >
      {children ?? label}
    </Button>
  );
};
