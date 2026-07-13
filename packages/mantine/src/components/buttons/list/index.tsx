import React from "react";
import { useListButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconList } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using uses Mantine {@link https://mantine.dev/core/button `<Button> `} component.
 * It uses the  {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/list-button} for more details.
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
  const { to, label, title, disabled, hidden, LinkComponent } = useListButton({
    resource: resourceNameFromProps,
    accessControl,
    meta,
  });
  const { variant, styles, ...commonProps } = rest;

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
    <Anchor
      component={LinkComponent as any}
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
        <ActionIcon
          {...(variant
            ? {
                variant: mapButtonVariantToActionIconVariant(variant),
              }
            : { variant: "default" })}
          aria-label={label}
          disabled={disabled}
          title={title}
          data-testid={RefineButtonTestIds.ListButton}
          className={RefineButtonClassNames.ListButton}
          {...commonProps}
        >
          <IconList size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant="default"
          disabled={isDisabled}
          leftIcon={<IconList size={18} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.ListButton}
          className={RefineButtonClassNames.ListButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
