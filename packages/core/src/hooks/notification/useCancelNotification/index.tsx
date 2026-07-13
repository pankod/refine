import { useContext } from "react";

import { UndoableQueueContext } from "@contexts/undoableQueue";
import type { IUndoableQueue } from "../../../contexts/undoableQueue/types";

export type UseCancelNotificationType = () => {
  notifications: IUndoableQueue[];
  notificationDispatch: React.Dispatch<any>;
};

export const useCancelNotification: UseCancelNotificationType = () => {
  const { notifications, notificationDispatch } =
    useContext(UndoableQueueContext);

  return { notifications, notificationDispatch };
};
