import React, { useEffect, useState } from "react";

import { useCancelNotification, useNotification, useTranslate } from "@hooks";

import { userFriendlySecond } from "@definitions/helpers";
import {
  ActionTypes,
  type IUndoableQueue,
} from "../../contexts/undoableQueue/types";

export const UndoableQueue: React.FC<{
  notification: IUndoableQueue;
}> = ({ notification }) => {
  const translate = useTranslate();

  const { notificationDispatch } = useCancelNotification();
  const { open } = useNotification();

  const [timeoutId, setTimeoutId] = useState<number | undefined>();

  const cancelNotification = () => {
    if (notification.isRunning === true) {
      if (notification.seconds === 0) {
        notification.doMutation();
      }
      if (!notification.isSilent) {
        open?.({
          key: `${notification.id}-${notification.resource}-notification`,
          type: "progress",
          message: translate(
            "notifications.undoable",
            {
              seconds: userFriendlySecond(notification.seconds),
            },
            `You have ${userFriendlySecond(
              notification.seconds,
            )} seconds to undo`,
          ),
          cancelMutation: notification.cancelMutation,
          undoableTimeout: userFriendlySecond(notification.seconds),
        });
      }

      if (notification.seconds > 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          notificationDispatch({
            type: ActionTypes.DECREASE_NOTIFICATION_SECOND,
            payload: {
              id: notification.id,
              seconds: notification.seconds,
              resource: notification.resource,
            },
          });
        }, 1000) as unknown as number;

        setTimeoutId(newTimeoutId);
      }
    }
  };

  useEffect(() => {
    cancelNotification();
  }, [notification]);

  return null;
};
