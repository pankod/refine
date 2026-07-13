import React, { useState } from "react";
import { useDeleteButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { Group, Text, Button, Popover, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Mantine {@link https://mantine.dev/core/button `<Button>`} and {@link https://mantine.dev/core/modal `<Modal>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  recordItemId,
  onSuccess,
  mutationMode,
  invalidates,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  meta,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  svgIconProps,
  ...rest
}) => {
  const {
    title,
    label,
    hidden,
    disabled,
    loading,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
    onConfirm,
  } = useDeleteButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    dataProviderName,
    errorNotification,
    successNotification,
    invalidates,
    mutationMode,
    accessControl,
    meta,
    onSuccess,
  });

  const [opened, setOpened] = useState(false);

  const { variant, styles, ...commonProps } = rest;

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      withArrow
      withinPortal
      disabled={isDisabled}
    >
      <Popover.Target>
        {hideText ? (
          <ActionIcon
            color="red"
            onClick={() => setOpened((o) => !o)}
            disabled={loading || isDisabled}
            loading={loading}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            {...(variant
              ? {
                  variant: mapButtonVariantToActionIconVariant(variant),
                }
              : { variant: "outline" })}
            {...commonProps}
          >
            <IconTrash size={18} {...svgIconProps} />
          </ActionIcon>
        ) : (
          <Button
            color="red"
            variant="outline"
            onClick={() => setOpened((o) => !o)}
            disabled={loading || isDisabled}
            loading={loading}
            title={title}
            leftIcon={<IconTrash size={18} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            {...rest}
          >
            {children ?? label}
          </Button>
        )}
      </Popover.Target>
      <Popover.Dropdown py="xs">
        <Text size="sm" weight="bold">
          {confirmTitle ?? defaultConfirmTitle}
        </Text>
        <Group position="center" noWrap spacing="xs" mt="xs">
          <Button onClick={() => setOpened(false)} variant="default" size="xs">
            {confirmCancelText ?? defaultCancelLabel}
          </Button>
          <Button
            color="red"
            onClick={() => {
              onConfirm();
              setOpened(false);
            }}
            autoFocus
            size="xs"
          >
            {confirmOkText ?? defaultConfirmOkLabel}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
