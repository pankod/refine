import React from "react";
import { useRefreshButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconRefresh } from "@tabler/icons-react";

import type { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/refresh-button} for more details.
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
    label,
    loading,
  } = useRefreshButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    dataProviderName,
  });

  return hideText ? (
    <IconButton
      variant="outline"
      aria-label={label}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        onClick ? onClick(e) : onRefresh();
      }}
      isLoading={loading}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      {...rest}
    >
      <IconRefresh size={20} {...svgIconProps} />
    </IconButton>
  ) : (
    <Button
      variant="outline"
      leftIcon={<IconRefresh size={20} {...svgIconProps} />}
      isLoading={loading}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        onClick ? onClick(e) : onRefresh();
      }}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      {...rest}
    >
      {children ?? label}
    </Button>
  );
};
