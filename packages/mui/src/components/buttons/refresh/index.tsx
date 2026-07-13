import React from "react";
import { useRefreshButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import LoadingButton from "@mui/lab/LoadingButton";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";

import type { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses uses Material UI {@link https://mui.com/material-ui/react-button `<Button>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
  resource: resourceNameFromProps,
  recordItemId,
  hideText = false,
  dataProviderName,
  svgIconProps,
  children,
  onClick,
  ...rest
}) => {
  const {
    onClick: onRefresh,
    loading,
    label,
  } = useRefreshButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    dataProviderName,
  });

  // `startIcon` is extracted from rest props so it doesn't get passed to the
  // underlying MUI Button via `{...restProps}` (which would cause a double icon).
  const { sx, startIcon, ...restProps } = rest;

  const defaultIcon = <RefreshOutlined fontSize="small" {...svgIconProps} />;

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop  | Button children    |
  // |----------|--------------|------------------------|--------------------|
  // | false    | undefined    | <RefreshOutlined>      | "Refresh"          |
  // | false    | <CustomIcon> | <CustomIcon>           | "Refresh"          |
  // | true     | undefined    | undefined              | <RefreshOutlined>  |
  // | true     | <CustomIcon> | undefined              | <CustomIcon>       |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <RefreshOutlined {...svgIconProps} />;
  const buttonChildren = hideText
    ? startIcon ?? defaultIcon
    : children ?? label;

  return (
    <LoadingButton
      startIcon={buttonStartIcon}
      loading={loading}
      loadingPosition={hideText ? "center" : "start"}
      onClick={onClick ? onClick : onRefresh}
      sx={{ minWidth: 0, ...sx }}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      {...restProps}
    >
      {buttonChildren}
    </LoadingButton>
  );
};
