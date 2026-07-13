import React from "react";
import { useShowButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

import type { ShowButtonProps } from "../types";

/**
 * `<ShowButton>` uses uses Material UI {@link https://mui.com/material-ui/react-button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the show page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/show-button} for more details.
 */
export const ShowButton: React.FC<ShowButtonProps> = ({
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
  const { to, label, title, hidden, disabled, LinkComponent } = useShowButton({
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

  const defaultIcon = <VisibilityOutlined fontSize="small" {...svgIconProps} />;

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop    | Button children        |
  // |----------|--------------|--------------------------|------------------------|
  // | false    | undefined    | <VisibilityOutlined>     | "Show"                 |
  // | false    | <CustomIcon> | <CustomIcon>             | "Show"                 |
  // | true     | undefined    | undefined                | <VisibilityOutlined>   |
  // | true     | <CustomIcon> | undefined                | <CustomIcon>           |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <VisibilityOutlined {...svgIconProps} />;
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
      data-testid={RefineButtonTestIds.ShowButton}
      className={RefineButtonClassNames.ShowButton}
      {...restProps}
    >
      {buttonChildren}
    </Button>
  );
};
