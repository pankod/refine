import React from "react";
import type { NotificationProvider } from "@refinedev/core";
import { useToast } from "@chakra-ui/react";

import { UndoableNotification } from "@components/undoableNotification";

export const useNotificationProvider = (): NotificationProvider => {
  const toast = useToast({
    position: "top-right",
    isClosable: true,
  });

  return {
    open: ({
      key,
      message,
      type,
      description,
      undoableTimeout,
      cancelMutation,
    }) => {
      if (type === "progress") {
        if (key && toast.isActive(key)) {
          toast.update(key, {
            render: () => (
              <UndoableNotification
                notificationKey={key}
                message={message}
                cancelMutation={cancelMutation}
                undoableTimeout={undoableTimeout}
              />
            ),
          });
        } else {
          toast({
            id: key,
            render: () => (
              <UndoableNotification
                notificationKey={key}
                message={message}
                cancelMutation={cancelMutation}
                undoableTimeout={undoableTimeout}
              />
            ),
          });
        }
      } else {
        if (key && toast.isActive(key)) {
          toast.update(key, {
            title: message,
            status: type,
            description,
          });
        } else {
          toast({
            id: key,
            title: message,
            description,
            status: type,
          });
        }
      }
    },
    close: (key) => toast.close(key),
  };
};

/**
 * @deprecated `notificationProvider` is deprecated due to consistent naming convention between UI libraries. Please use `useNotificationProvider` export as your notification provider.
 */
export const notificationProvider = useNotificationProvider;
