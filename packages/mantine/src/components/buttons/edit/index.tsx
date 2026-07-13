import React from "react";
import { useEditButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { EditButtonProps } from "../types";

/**
 * `<EditButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/edit-button} for more details.
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
  const { to, label, title, disabled, hidden, LinkComponent } = useEditButton({
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
          title={title}
          disabled={isDisabled}
          aria-label={label}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          {...(variant
            ? {
                variant: mapButtonVariantToActionIconVariant(variant),
              }
            : { variant: "default" })}
          {...commonProps}
        >
          <IconPencil size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant="default"
          disabled={isDisabled}
          leftIcon={<IconPencil size={18} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
