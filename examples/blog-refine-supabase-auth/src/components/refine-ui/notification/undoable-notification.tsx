import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslate } from "@refinedev/core";
import React from "react";

type UndoableNotificationProps = {
  message: string;
  description?: string;
  undoableTimeout?: number;
  cancelMutation?: () => void;
  onClose?: () => void;
};

export function UndoableNotification({
  message,
  description,
  undoableTimeout = 5,
  cancelMutation,
  onClose,
}: UndoableNotificationProps) {
  const t = useTranslate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, undoableTimeout * 1000);

    return () => clearTimeout(timer);
  }, [onClose, undoableTimeout]);

  const handleUndo = () => {
    cancelMutation?.();
    onClose?.();
  };

  return (
    <div
      className={cn(
        "bg-card",
        "text-card-foreground",
        "rounded-lg",
        "p-4",
        "shadow-xl",
        "border",
        "border-border",
        "min-w-[320px]",
        "max-w-md",
      )}
    >
      <div className={cn("flex", "items-center", "justify-between")}>
        <div className={cn("flex-1", "mr-4")}>
          <div className={cn("font-medium", "text-foreground", "text-sm")}>
            {message}
          </div>
          {description && (
            <div className={cn("text-muted-foreground", "text-sm", "mt-1")}>
              {description}
            </div>
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleUndo}
          className={cn(
            "bg-secondary",
            "hover:bg-secondary/80",
            "text-secondary-foreground",
            "border-0",
            "px-4",
            "py-2",
            "text-sm",
            "font-medium",
            "rounded-md",
          )}
        >
          {t("buttons.undo", "Undo")}
        </Button>
      </div>
    </div>
  );
}

UndoableNotification.displayName = "UndoableNotification";
