import { useCallback } from "react";

import { useNotification } from "@hooks";

import type { OpenNotificationParams } from "../../../contexts/notification/types";

export const useHandleNotification = (): typeof handleNotification => {
  const { open } = useNotification();

  const handleNotification = useCallback(
    (
      notification: OpenNotificationParams | false | undefined,
      fallbackNotification?: OpenNotificationParams,
    ) => {
      if (notification !== false) {
        if (notification) {
          open?.(notification);
        } else if (fallbackNotification) {
          open?.(fallbackNotification);
        }
      }
    },
    [],
  );

  return handleNotification;
};
