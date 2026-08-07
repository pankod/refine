import React from "react";
import { useCreateButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";

import type { CreateButtonProps } from "../types";

/**
 * <CreateButton> uses Material UI {@link https://mui.com/material-ui/react-button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/create-button} for more details.
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...props
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useCreateButton(
    {
      resource: resourceNameFromProps,
      meta,
      accessControl,
    },
  );
  const isDisabled = disabled || props.disabled;
  const isHidden = hidden || props.hidden;

  if (isHidden) return null;

  // `startIcon` is extracted from rest props so it doesn't get passed to the
  // underlying MUI Button via `{...restProps}` (which would cause a double icon).
  const { sx, startIcon, ...restProps } = props;

  const defaultIcon = <AddBoxOutlined fontSize="small" {...svgIconProps} />;

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop | Button children  |
  // |----------|--------------|-----------------------|------------------|
  // | false    | undefined    | <AddBoxOutlined>      | "Create"         |
  // | false    | <CustomIcon> | <CustomIcon>          | "Create"         |
  // | true     | undefined    | undefined             | <AddBoxOutlined> |
  // | true     | <CustomIcon> | undefined             | <CustomIcon>     |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <AddBoxOutlined {...svgIconProps} />;
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
      variant="contained"
      sx={{ minWidth: 0, textDecoration: "none", ...sx }}
      data-testid={RefineButtonTestIds.CreateButton}
      className={RefineButtonClassNames.CreateButton}
      {...restProps}
    >
      {buttonChildren}
    </Button>
  );
};
