import React from "react";
import { useSaveButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveOutlined from "@mui/icons-material/SaveOutlined";

import type { SaveButtonProps } from "../types";

/**
 * `<SaveButton>` uses Material UI {@link https://mui.com/material-ui/react-button `<Button>`} component.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/save-button} for more details.
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
  hideText = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useSaveButton();

  // `startIcon` is extracted from rest props so it doesn't get passed to the
  // underlying MUI Button via `{...restProps}` (which would cause a double icon).
  const { sx, startIcon, ...restProps } = rest;

  const defaultIcon = <SaveOutlined fontSize="small" {...svgIconProps} />;

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop | Button children |
  // |----------|--------------|-----------------------|-----------------|
  // | false    | undefined    | <SaveOutlined>        | "Save"          |
  // | false    | <CustomIcon> | <CustomIcon>          | "Save"          |
  // | true     | undefined    | undefined             | <SaveOutlined>  |
  // | true     | <CustomIcon> | undefined             | <CustomIcon>    |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <SaveOutlined {...svgIconProps} />;
  const buttonChildren = hideText
    ? startIcon ?? defaultIcon
    : children ?? label;

  return (
    <LoadingButton
      startIcon={buttonStartIcon}
      sx={{ minWidth: 0, ...sx }}
      variant="contained"
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      {...restProps}
    >
      {buttonChildren}
    </LoadingButton>
  );
};
