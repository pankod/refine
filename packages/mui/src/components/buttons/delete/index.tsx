import React from "react";
import { useDeleteButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import LoadingButton from "@mui/lab/LoadingButton";

import DeleteOutline from "@mui/icons-material/DeleteOutline";

import type { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Material UI {@link https://mui.com/material-ui/react-button `<Button>`} and {@link https://mui.com/material-ui/react-dialog/#main-content `<Dialog>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  recordItemId,
  onSuccess,
  mutationMode,
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
  invalidates,
  ...rest
}) => {
  const {
    onConfirm,
    title,
    label,
    hidden,
    disabled,
    loading,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel,
    cancelLabel,
  } = useDeleteButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    dataProviderName,
    mutationMode,
    accessControl,
    invalidates,
    onSuccess,
    meta,
    successNotification,
    errorNotification,
  });

  const [open, setOpen] = React.useState(false);

  // `startIcon` is extracted from rest props so it doesn't get passed to the
  // underlying MUI Button via `{...restProps}` (which would cause a double icon).
  const { sx, startIcon, ...restProps } = rest;

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  const defaultIcon = <DeleteOutline fontSize="small" {...svgIconProps} />;

  // When `hideText` is true, the button renders only an icon (no startIcon prop).
  // When `hideText` is false, the icon goes into the `startIcon` slot and text goes as children.
  // In both modes, a user-provided `startIcon` takes priority over the default icon.
  //
  // | hideText | startIcon    | Button startIcon prop | Button children  |
  // |----------|--------------|-----------------------|------------------|
  // | false    | undefined    | <DeleteOutline>       | "Delete"         |
  // | false    | <CustomIcon> | <CustomIcon>          | "Delete"         |
  // | true     | undefined    | undefined             | <DeleteOutline>  |
  // | true     | <CustomIcon> | undefined             | <CustomIcon>     |
  const buttonStartIcon = hideText
    ? undefined
    : startIcon ?? <DeleteOutline {...svgIconProps} />;
  const buttonChildren = hideText
    ? startIcon ?? defaultIcon
    : children ?? label;

  return (
    <div>
      <LoadingButton
        color="error"
        onClick={() => setOpen(true)}
        disabled={isDisabled}
        loading={loading}
        startIcon={buttonStartIcon}
        title={title}
        sx={{ minWidth: 0, ...sx }}
        loadingPosition={hideText ? "center" : "start"}
        data-testid={RefineButtonTestIds.DeleteButton}
        className={RefineButtonClassNames.DeleteButton}
        {...restProps}
      >
        {buttonChildren}
      </LoadingButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmTitle ?? defaultConfirmTitle}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setOpen(false)}>
            {confirmCancelText ?? cancelLabel}
          </Button>
          <Button
            color="error"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            autoFocus
          >
            {confirmOkText ?? confirmOkLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
