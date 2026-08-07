import React, { useState } from "react";
import { useDeleteButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";

import type { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button>`} and {@link https://chakra-ui.com/docs/components/popover `<Popover>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  recordItemId,
  onSuccess,
  mutationMode: mutationModeProp,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  meta,
  invalidates,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  svgIconProps,
  ...rest
}) => {
  const {
    onConfirm,
    label,
    title,
    disabled,
    hidden,
    loading,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
  } = useDeleteButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    successNotification,
    errorNotification,
    accessControl,
    meta,
    dataProviderName,
    invalidates,
  });

  const [opened, setOpened] = useState(false);

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
    <Popover isOpen={opened} isLazy>
      <PopoverTrigger>
        {hideText ? (
          <IconButton
            colorScheme="red"
            variant="outline"
            aria-label={title}
            onClick={() => setOpened((o) => !o)}
            isDisabled={loading || isDisabled}
            isLoading={loading}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            {...rest}
          >
            <IconTrash size={20} {...svgIconProps} />
          </IconButton>
        ) : (
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => setOpened((o) => !o)}
            isDisabled={loading || isDisabled}
            isLoading={loading}
            leftIcon={<IconTrash size={20} />}
            title={title}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            {...rest}
          >
            {children ?? label}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader textAlign="center">
          {confirmTitle ?? defaultConfirmTitle}
        </PopoverHeader>
        <PopoverBody display="flex" justifyContent="center">
          <HStack>
            <Button onClick={() => setOpened(false)} size="sm">
              {confirmCancelText ?? defaultCancelLabel}
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onConfirm();
                setOpened(false);
              }}
              autoFocus
              size="sm"
            >
              {confirmOkText ?? defaultConfirmOkLabel}
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
