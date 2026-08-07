import type { NotificationProvider } from "@refinedev/core";
import { toast } from "sonner";
import React from "react";

export const useNotificationProvider = (): NotificationProvider => {
  return {
    open: ({
      key,
      type,
      message,
      description,
      undoableTimeout,
      cancelMutation,
    }) => {
      if (type === "success") {
        toast.success(message, {
          id: key,
          description,
          richColors: true,
        });
      }

      if (type === "error") {
        toast.error(message, {
          id: key,
          description,
          richColors: true,
        });
      }

      if (type === "progress") {
        const toastId = key || Date.now();

        toast.custom(
          () =>
            React.createElement(UndoableNotification, {
              message,
              description,
              undoableTimeout,
              cancelMutation,
              onClose: () => toast.dismiss(toastId),
            }),
          {
            id: toastId,
            duration: (undoableTimeout || 5) * 1000,
          },
        );
      }
    },
    close: (id) => {
      toast.dismiss(id);
    },
  };
};

interface UndoableNotificationProps {
  message: string;
  description?: string;
  undoableTimeout?: number;
  cancelMutation?: () => void;
  onClose?: () => void;
}

const UndoableNotification: React.FC<UndoableNotificationProps> = ({
  message,
  description,
  undoableTimeout = 5,
  cancelMutation,
  onClose,
}) => {
  const [countdown, setCountdown] = React.useState(undoableTimeout);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const handleUndo = () => {
    cancelMutation?.();
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return React.createElement(
    "div",
    {
      className:
        "flex items-center justify-between w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700",
    },
    React.createElement(
      "div",
      { className: "flex-1 mr-3" },
      React.createElement(
        "div",
        { className: "font-medium text-gray-900 dark:text-white" },
        message,
      ),
      description &&
        React.createElement(
          "div",
          { className: "text-sm text-gray-500 dark:text-gray-400 mt-1" },
          description,
        ),
      React.createElement(
        "div",
        { className: "text-xs text-gray-400 dark:text-gray-500 mt-2" },
        `Auto-closes in ${countdown}s`,
      ),
    ),
    React.createElement(
      "div",
      { className: "flex items-center gap-2" },
      React.createElement(
        "button",
        {
          onClick: handleUndo,
          className:
            "inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30",
        },
        "Undo",
      ),
      React.createElement(
        "button",
        {
          onClick: handleClose,
          className:
            "inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded dark:hover:bg-gray-700 dark:hover:text-gray-300",
        },
        "×",
      ),
    ),
  );
};
