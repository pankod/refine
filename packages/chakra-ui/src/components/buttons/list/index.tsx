import React from "react";
import { useListButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconList } from "@tabler/icons-react";

import type { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * It uses the  {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/list-button} for more details.
 **/
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
          data-testid={RefineButtonTestIds.ListButton}
          className={RefineButtonClassNames.ListButton}
          {...rest}
        >
          <IconList size={20} {...svgIconProps} />
        </IconButton>
      ) : (
        <Button
          variant="outline"
          isDisabled={isDisabled}
          leftIcon={<IconList size={20} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.ListButton}
          className={RefineButtonClassNames.ListButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </LinkComponent>
  );
};
