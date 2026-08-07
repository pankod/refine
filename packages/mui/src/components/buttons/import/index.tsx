import React from "react";
import { useImportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import LoadingButton from "@mui/lab/LoadingButton";
import ImportExportOutlined from "@mui/icons-material/ImportExportOutlined";

import type { ImportButtonProps } from "../types";

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/api-reference/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses Material UI {@link https://mui.com/material-ui/react-button  `<Button>`} and native html {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input  `<input>`} element.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/import-button} for more details.
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
  inputProps,
  hideText = false,
  loading = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useImportButton();

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
  // | false    | undefined    | <ImportExportOutlined>     | "Import"                   |
  // | false    | <CustomIcon> | <CustomIcon>               | "Import"                   |
  // | true     | undefined    | undefined                  | <ImportExportOutlined>     |
  // | true     | <CustomIcon> | undefined                  | <CustomIcon>               |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <ImportExportOutlined {...svgIconProps} />;
  const buttonChildren = hideText
    ? startIcon ?? defaultIcon
    : children ?? label;

  return (
    <label htmlFor="contained-button-file">
      <input {...inputProps} id="contained-button-file" multiple hidden />
      <LoadingButton
        component="span"
        startIcon={buttonStartIcon}
        loadingPosition={hideText ? "center" : "start"}
        loading={loading}
        sx={{ minWidth: 0, ...sx }}
        data-testid={RefineButtonTestIds.ImportButton}
        className={RefineButtonClassNames.ImportButton}
        {...restProps}
      >
        {buttonChildren}
      </LoadingButton>
    </label>
  );
};
