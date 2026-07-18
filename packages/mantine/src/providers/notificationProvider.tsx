import React from "react";
import type { NotificationProvider } from "@refinedev/core";
import {
  showNotification,
  updateNotification,
  hideNotification,
} from "@mantine/notifications";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import {
  IconCheck,
  IconRotate2,
  IconX,
  IconInfoCircle,
  IconAlertCircle,
} from "@tabler/icons-react";

import { RingCountdown } from "@components";

const notificationStyleByType: Record<
  string,
  { color: string; icon: React.ReactNode }
> = {
  success: { color: "primary", icon: <IconCheck size={18} /> },
  error: { color: "red", icon: <IconX size={18} /> },
  info: { color: "blue", icon: <IconInfoCircle size={18} /> },
  warning: { color: "orange", icon: <IconAlertCircle size={18} /> },
};

const defaultStyle = { color: "gray", icon: null };

export const useNotificationProvider = (): NotificationProvider => {
  const activeNotifications: string[] = [];

  const isNotificationActive = (key?: string) => {
    return activeNotifications.includes(key as string);
  };

  const addNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index === -1) {
        activeNotifications.push(key);
      }
    }
  };

  const removeNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index > -1) {
        activeNotifications.splice(index, 1);
      }
    }
  };

  const getStyle = (type?: string) => {
    return notificationStyleByType[type ?? ""] ?? defaultStyle;
  };

  const notificationProvider: NotificationProvider = {
    open: ({
      message,
      description,
      type,
      undoableTimeout,
      key,
      cancelMutation,
    }) => {
      if (type === "progress") {
        if (isNotificationActive(key)) {
          updateNotification({
            id: key!,
            message: (
              <Group position="apart" noWrap>
                <Group spacing="xs" position="center">
                  <RingCountdown undoableTimeout={undoableTimeout ?? 0} />
                  <Box>
                    <Text>{message}</Text>
                    {description && <Text>{description}</Text>}
                  </Box>
                </Group>
                <ActionIcon
                  variant="default"
                  onClick={() => {
                    cancelMutation?.();
                    if (key) {
                      removeNotification(key);
                      hideNotification(key);
                    }
                  }}
                >
                  <IconRotate2 size={18} />
                </ActionIcon>
              </Group>
            ),
            styles: {
              root: {
                paddingLeft: "8px",
                paddingTop: "0px",
                paddingBottom: "0px",
                "&::before": { display: "none" },
              },
            },
            disallowClose: true,
            autoClose: false,
          });
        } else {
          addNotification(key);
          showNotification({
            id: key,
            message: (
              <Group position="apart" noWrap>
                <Group spacing="xs" position="center">
                  <RingCountdown undoableTimeout={undoableTimeout ?? 0} />
                  <Box>
                    <Text>{message}</Text>
                    {description && <Text>{description}</Text>}
                  </Box>
                </Group>
                <ActionIcon
                  variant="default"
                  onClick={() => {
                    cancelMutation?.();
                    if (key) {
                      removeNotification(key);
                      hideNotification(key);
                    }
                  }}
                >
                  <IconRotate2 size={18} />
                </ActionIcon>
              </Group>
            ),

            styles: {
              root: {
                paddingLeft: "8px",
                paddingTop: "0px",
                paddingBottom: "0px",
                "&::before": { display: "none" },
              },
            },
            disallowClose: true,
            autoClose: false,
          });
        }
      } else {
        const style = getStyle(type);
        if (isNotificationActive(key)) {
          updateNotification({
            id: key!,
            color: style.color,
            icon: style.icon ?? undefined,
            message,
            title: description,
            autoClose: 5000,
          });
        } else {
          addNotification(key);
          showNotification({
            id: key!,
            color: style.color,
            icon: style.icon ?? undefined,
            message,
            title: description,
            onClose: () => {
              removeNotification(key);
            },
            autoClose: 5000,
          });
        }
      }
    },
    close: (key) => {
      removeNotification(key);
      hideNotification(key);
    },
  };

  return notificationProvider;
};

/**
 * @deprecated `notificationProvider` is deprecated due to consistent naming convention between UI libraries. Please use `useNotificationProvider` export as your notification provider.
 */
export const notificationProvider = useNotificationProvider;
