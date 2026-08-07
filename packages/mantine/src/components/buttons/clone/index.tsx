import React from "react";
import { useCloneButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { CloneButtonProps } from "../types";

/**
 * `<CloneButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/clone-button} for more details.
 *
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
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
  const { to, label, title, hidden, disabled, LinkComponent } = useCloneButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    accessControl,
    meta,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  const { variant, styles, ...commonProps } = rest;

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
          disabled={isDisabled}
          title={title}
          aria-label={label}
          {...(variant
            ? {
                variant: mapButtonVariantToActionIconVariant(variant),
              }
            : { variant: "default" })}
          data-testid={RefineButtonTestIds.CloneButton}
          className={RefineButtonClassNames.CloneButton}
          {...commonProps}
        >
          <IconSquarePlus size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          disabled={isDisabled}
          variant="default"
          leftIcon={<IconSquarePlus size={18} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.CloneButton}
          className={RefineButtonClassNames.CloneButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
