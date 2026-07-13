import React from "react";
import type { NotificationProvider } from "@refinedev/core";
import { toast } from "react-toastify";
import { UndoableNotification } from "../components/undoableNotification";

export const notificationProvider: NotificationProvider = {
  open: ({ key, message, type, undoableTimeout, cancelMutation }) => {
    if (type === "progress") {
      if (toast.isActive(key as string | number)) {
        toast.update(key as string | number, {
          progress: undoableTimeout && (undoableTimeout / 10) * 2,
          render: (
            <UndoableNotification
              message={message}
              cancelMutation={cancelMutation}
            />
          ),
          type: "default",
        });
      } else {
        toast(
          <UndoableNotification
            message={message}
            cancelMutation={cancelMutation}
          />,
          {
            toastId: key,
            updateId: key,
            closeOnClick: false,
            closeButton: false,
            autoClose: false,
            progress: undoableTimeout && (undoableTimeout / 10) * 2,
          },
        );
      }
    } else {
      if (toast.isActive(key as string | number)) {
        toast.update(key as string | number, {
          render: message,
          closeButton: true,
          autoClose: 5000,
          type,
        });
      } else {
        toast(message, {
          toastId: key,
          type,
        });
      }
    }
  },
  close: (key) => toast.dismiss(key),
};
