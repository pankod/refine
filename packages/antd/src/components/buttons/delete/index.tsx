import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import type { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} and {@link https://ant.design/components/button/ `<Popconfirm>`} components.
 * When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/delete-button} for more details.
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
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  invalidates,
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
    invalidates,
    meta,
    onSuccess,
    mutationMode: mutationModeProp,
    errorNotification,
    successNotification,
    accessControl,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
    <Popconfirm
      key="delete"
      okText={confirmOkText ?? defaultConfirmOkLabel}
      cancelText={confirmCancelText ?? defaultCancelLabel}
      okType="danger"
      title={confirmTitle ?? defaultConfirmTitle}
      okButtonProps={{ disabled: loading }}
      onConfirm={onConfirm}
      disabled={isDisabled}
    >
      <Button
        danger
        loading={loading}
        icon={<DeleteOutlined />}
        title={title}
        disabled={isDisabled}
        data-testid={RefineButtonTestIds.DeleteButton}
        className={RefineButtonClassNames.DeleteButton}
        {...rest}
      >
        {!hideText && (children ?? label)}
      </Button>
    </Popconfirm>
  );
};
