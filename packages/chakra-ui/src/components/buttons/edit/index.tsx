import React from "react";
import { useEditButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconPencil } from "@tabler/icons-react";
import { Button, IconButton } from "@chakra-ui/react";

import type { EditButtonProps } from "../types";

/**
 * `<EditButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/edit-button} for more details.
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
  const { to, label, title, hidden, disabled, LinkComponent } = useEditButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    accessControl,
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
          title={title}
          isDisabled={isDisabled}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          {...rest}
        >
          <IconPencil size={20} {...svgIconProps} />
        </IconButton>
      ) : (
        <Button
          variant="outline"
          isDisabled={isDisabled}
          leftIcon={<IconPencil size={20} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </LinkComponent>
  );
};
