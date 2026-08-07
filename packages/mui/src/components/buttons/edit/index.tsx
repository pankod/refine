import React from "react";
import { useEditButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import EditOutlined from "@mui/icons-material/EditOutlined";

import type { EditButtonProps } from "../types";

/**
 * `<EditButton>` uses uses Material UI {@link https://mui.com/material-ui/react-button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/edit-button} for more details.
 */
export const EditButton: React.FC<EditButtonProps> = ({
  resource: resourceNameFromProps,
  recordItemId,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, hidden, disabled, LinkComponent } = useEditButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    accessControl,
    meta,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  // `startIcon` is extracted from rest props so it doesn't get passed to the
  // underlying MUI Button via `{...restProps}` (which would cause a double icon).
  const { sx, startIcon, ...restProps } = rest;

  const defaultIcon = <EditOutlined fontSize="small" {...svgIconProps} />;

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop | Button children |
  // |----------|--------------|-----------------------|-----------------|
  // | false    | undefined    | <EditOutlined>        | "Edit"          |
  // | false    | <CustomIcon> | <CustomIcon>          | "Edit"          |
  // | true     | undefined    | undefined             | <EditOutlined>  |
  // | true     | <CustomIcon> | undefined             | <CustomIcon>    |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? (
        <EditOutlined sx={{ selfAlign: "center" }} {...svgIconProps} />
      );
  const buttonChildren = hideText
    ? startIcon ?? defaultIcon
    : children ?? label;

  return (
    <Button
      disabled={isDisabled}
      component={LinkComponent}
      to={to}
      replace={false}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      startIcon={buttonStartIcon}
      title={title}
      sx={{ minWidth: 0, textDecoration: "none", ...sx }}
      data-testid={RefineButtonTestIds.EditButton}
      className={RefineButtonClassNames.EditButton}
      {...restProps}
    >
      {buttonChildren}
    </Button>
  );
};
