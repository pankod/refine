import React, {
  createContext,
  useReducer,
  type PropsWithChildren,
} from "react";

import isEqual from "lodash/isEqual";

import { UndoableQueue } from "../../components";
import {
  ActionTypes,
  type IUndoableQueue,
  type IUndoableQueueContext,
} from "./types";

export const UndoableQueueContext = createContext<IUndoableQueueContext>({
  notifications: [],
  notificationDispatch: () => false,
});

const initialState: IUndoableQueue[] = [];

export const undoableQueueReducer = (state: IUndoableQueue[], action: any) => {
  switch (action.type) {
    case ActionTypes.ADD: {
      const newState = state.filter((notificationItem: IUndoableQueue) => {
        return !(
          isEqual(notificationItem.id, action.payload.id) &&
          notificationItem.resource === action.payload.resource
        );
      });

      return [
        ...newState,
        {
          ...action.payload,
          isRunning: true,
        },
      ];
    }
    case ActionTypes.REMOVE:
      return state.filter(
        (notificationItem: IUndoableQueue) =>
          !(
            isEqual(notificationItem.id, action.payload.id) &&
            notificationItem.resource === action.payload.resource
          ),
      );
    case ActionTypes.DECREASE_NOTIFICATION_SECOND:
      return state.map((notificationItem: IUndoableQueue) => {
        if (
          isEqual(notificationItem.id, action.payload.id) &&
          notificationItem.resource === action.payload.resource
        ) {
          return {
            ...notificationItem,
            seconds: action.payload.seconds - 1000,
          };
        }
        return notificationItem;
      });
    default:
      return state;
  }
};

export const UndoableQueueContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [notifications, notificationDispatch] = useReducer(
    undoableQueueReducer,
    initialState,
  );

  const notificationData = { notifications, notificationDispatch };

  return (
    <UndoableQueueContext.Provider value={notificationData}>
      {children}
      {typeof window !== "undefined"
        ? notifications.map((notification) => (
            <UndoableQueue
              key={`${notification.id}-${notification.resource}-queue`}
              notification={notification}
            />
          ))
        : null}
    </UndoableQueueContext.Provider>
  );
};
