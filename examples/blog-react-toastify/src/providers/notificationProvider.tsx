import React from "react";
import type { NotificationProvider } from "@refinedev/core";
import { toast } from "react-toastify";
import { UndoableNotification } from "../components/undoable-notification";

export const notificationProvider: NotificationProvider = {
  open: ({ key, message, type, undoableTimeout, cancelMutation }) => {
    if (type === "progress") {
      if (toast.isActive(key as React.ReactText)) {
        toast.update(key as React.ReactText, {
          progress: undoableTimeout && (undoableTimeout / 10) * 2,
          render: (
            <UndoableNotification
              message={message}
              cancelMutation={cancelMutation}
            />
          ),
          type: "default",
        });

        return;
      }

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

      return;
    }

    if (toast.isActive(key as React.ReactText)) {
      toast.update(key as React.ReactText, {
        render: message,
        closeButton: true,
        autoClose: 5000,
        type,
      });

      return;
    }

    toast(message, {
      toastId: key,
      type,
    });
  },

  close: (key: any) => toast.dismiss(key),
};
