import type { NotificationProvider } from "@refinedev/core";
import { App, notification as staticNotification } from "antd";
import React from "react";

import { UndoableNotification } from "@components/undoableNotification";

export const useNotificationProvider = (): NotificationProvider => {
  const { notification: notificationFromContext } = App.useApp();
  const notification =
    "open" in notificationFromContext
      ? notificationFromContext
      : staticNotification;

  const notificationProvider: NotificationProvider = {
    open: ({
      key,
      message,
      description,
      type,
      cancelMutation,
      undoableTimeout,
    }) => {
      if (type === "progress") {
        notification.open({
          key,
          description: (
            <UndoableNotification
              notificationKey={key}
              message={message}
              cancelMutation={() => {
                cancelMutation?.();
                notification.destroy(key ?? "");
              }}
              undoableTimeout={undoableTimeout}
            />
          ),
          message: null,
          duration: 0,
          closeIcon: <></>,
        });
      } else {
        const notificationArgs = {
          key,
          description: message,
          message: description ?? null,
        };

        switch (type) {
          case "success":
            notification.success(notificationArgs);
            break;
          case "error":
            notification.error(notificationArgs);
            break;
          case "info":
            notification.info(notificationArgs);
            break;
          case "warning":
            notification.warning(notificationArgs);
            break;
          default:
            notification.open(notificationArgs);
        }
      }
    },
    close: (key) => notification.destroy(key),
  };

  return notificationProvider;
};
