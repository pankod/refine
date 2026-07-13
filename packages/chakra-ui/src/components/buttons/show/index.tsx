import React from "react";
import { useShowButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconEye } from "@tabler/icons-react";

import type { ShowButtonProps } from "../types";

/**
 * `<ShowButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the show page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/show-button} for more details.
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

  return (
    <LinkComponent
      to={to}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      {hideText ? (
        <IconButton
          variant="outline"
          aria-label={label}
          isDisabled={isDisabled}
          title={title}
          data-testid={RefineButtonTestIds.ShowButton}
          className={RefineButtonClassNames.ShowButton}
          {...rest}
        >
          <IconEye size={20} {...svgIconProps} />
        </IconButton>
      ) : (
        <Button
          variant="outline"
          isDisabled={isDisabled}
          leftIcon={<IconEye size={20} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.ShowButton}
          className={RefineButtonClassNames.ShowButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </LinkComponent>
  );
};
