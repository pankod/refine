import { NotificationProvider } from "@refinedev/core";

/**
 * Check out the Notification Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/notification-provider/
 **/
export const notificationProvider: NotificationProvider = {
  open: ({
    message,
    type,
    description,
    key,
    cancelMutation,
    undoableTimeout,
  }) => {
    console.log("open", {
      message,
      type,
      description,
      key,
      cancelMutation,
      undoableTimeout,
    });

    // TODO: open the notification
  },
  close: (key: string) => {
    console.log("close", { key });

    // TODO: close the notification
  },
};
