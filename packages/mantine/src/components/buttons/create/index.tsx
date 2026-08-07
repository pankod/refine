import React from "react";
import { useCreateButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { CreateButtonProps } from "../types";

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useCreateButton(
    {
      resource: resourceNameFromProps,
      accessControl,
      meta,
    },
  );

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
          color="primary"
          {...(variant
            ? {
                variant: mapButtonVariantToActionIconVariant(variant),
              }
            : { variant: "filled" })}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          {...commonProps}
        >
          <IconSquarePlus size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          disabled={isDisabled}
          leftIcon={<IconSquarePlus size={18} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          color="primary"
          variant="filled"
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
