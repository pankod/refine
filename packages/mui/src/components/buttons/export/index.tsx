import React from "react";
import { useExportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import LoadingButton from "@mui/lab/LoadingButton";
import ImportExportOutlined from "@mui/icons-material/ImportExportOutlined";

import type { ExportButtonProps } from "../types";

/**
 * `<ExportButton>` uses Material UI {@link https://mui.com/material-ui/react-button `<Button>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
  hideText = false,
  children,
  loading = false,
  svgIconProps,
  ...rest
}) => {
  const { label } = useExportButton();

  // `startIcon` is extracted from rest props so it doesn't get passed to the
  // underlying MUI Button via `{...restProps}` (which would cause a double icon).
  const { sx, startIcon, ...restProps } = rest;

  const defaultIcon = (
    <ImportExportOutlined fontSize="small" {...svgIconProps} />
  );

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop      | Button children            |
  // |----------|--------------|----------------------------|----------------------------|
  // | false    | undefined    | <ImportExportOutlined>     | "Export"                   |
  // | false    | <CustomIcon> | <CustomIcon>               | "Export"                   |
  // | true     | undefined    | undefined                  | <ImportExportOutlined>     |
  // | true     | <CustomIcon> | undefined                  | <CustomIcon>               |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <ImportExportOutlined {...svgIconProps} />;
  const buttonChildren = hideText
    ? startIcon ?? defaultIcon
    : children ?? label;

  return (
    <LoadingButton
      loading={loading}
      startIcon={buttonStartIcon}
      loadingPosition={hideText ? "center" : "start"}
      sx={{ minWidth: 0, ...sx }}
      data-testid={RefineButtonTestIds.ExportButton}
      className={RefineButtonClassNames.ExportButton}
      {...restProps}
    >
      {buttonChildren}
    </LoadingButton>
  );
};
