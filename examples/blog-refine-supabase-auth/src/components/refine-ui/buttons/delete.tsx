"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type BaseKey, useDeleteButton } from "@refinedev/core";
import { Loader2, Trash } from "lucide-react";
import React from "react";

type DeleteButtonProps = {
  /**
   * Resource name for API data interactions. `identifier` of the resource can be used instead of the `name` of the resource.
   * @default Inferred resource name from the route
   */
  resource?: string;
  /**
   * Data item identifier for the actions with the API
   * @default Reads `:id` from the URL
   */
  recordItemId?: BaseKey;
  /**
   * Access Control configuration for the button
   * @default `{ enabled: true, hideIfUnauthorized: false }`
   */
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
  /**
   * `meta` property is used when creating the URL for the related action and path.
   */
  meta?: Record<string, unknown>;
} & React.ComponentProps<typeof Button>;

export const DeleteButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  DeleteButtonProps
>(({ resource, recordItemId, accessControl, meta, children, ...rest }, ref) => {
  const {
    hidden,
    disabled,
    loading,
    onConfirm,
    label,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
  } = useDeleteButton({
    resource,
    id: recordItemId,
    accessControl,
    meta,
  });
  const [open, setOpen] = React.useState(false);

  const isDisabled = disabled || rest.disabled || loading;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  const confirmCancelText = defaultCancelLabel;
  const confirmOkText = defaultConfirmOkLabel;
  const confirmTitle = defaultConfirmTitle;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <Button
            variant="destructive"
            {...rest}
            ref={ref}
            disabled={isDisabled}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children ?? (
              <div className="flex items-center gap-2 font-semibold">
                <Trash className="h-4 w-4" />
                <span>{label}</span>
              </div>
            )}
          </Button>
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="start">
        <div className="flex flex-col gap-2">
          <p className="text-sm">{confirmTitle}</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              {confirmCancelText}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={loading}
              onClick={() => {
                if (typeof onConfirm === "function") {
                  onConfirm();
                }
                setOpen(false);
              }}
            >
              {confirmOkText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});

DeleteButton.displayName = "DeleteButton";
