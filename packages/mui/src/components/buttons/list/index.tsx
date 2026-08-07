import React from "react";
import { useListButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import ListOutlined from "@mui/icons-material/ListOutlined";

import type { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using uses Material UI {@link https://mui.com/material-ui/react-button/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/list-button} for more details.
 */
export const ListButton: React.FC<ListButtonProps> = ({
  resource: resourceNameFromProps,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, hidden, disabled, LinkComponent } = useListButton({
    resource: resourceNameFromProps,
    meta,
    accessControl,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  // `startIcon` is extracted from rest props so it doesn't get passed to the
  // underlying MUI Button via `{...restProps}` (which would cause a double icon).
  const { sx, startIcon, ...restProps } = rest;

  const defaultIcon = <ListOutlined fontSize="small" {...svgIconProps} />;

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop | Button children |
  // |----------|--------------|-----------------------|-----------------|
  // | false    | undefined    | <ListOutlined>        | "List"          |
  // | false    | <CustomIcon> | <CustomIcon>          | "List"          |
  // | true     | undefined    | undefined             | <ListOutlined>  |
  // | true     | <CustomIcon> | undefined             | <CustomIcon>    |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <ListOutlined {...svgIconProps} />;
  const buttonChildren = hideText
    ? startIcon ?? defaultIcon
    : children ?? label;

  return (
    <Button
      component={LinkComponent}
      to={to}
      replace={false}
      disabled={isDisabled}
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
      data-testid={RefineButtonTestIds.ListButton}
      className={RefineButtonClassNames.ListButton}
      {...restProps}
    >
      {buttonChildren}
    </Button>
  );
};
