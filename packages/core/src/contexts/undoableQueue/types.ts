import type { BaseKey } from "../data/types";

export enum ActionTypes {
  ADD = "ADD",
  REMOVE = "REMOVE",
  DECREASE_NOTIFICATION_SECOND = "DECREASE_NOTIFICATION_SECOND",
}

export interface IUndoableQueue {
  id: BaseKey;
  resource: string;
  cancelMutation: () => void;
  doMutation: () => void;
  seconds: number;
  isRunning: boolean;
  isSilent: boolean;
}

export interface IUndoableQueueContext {
  notifications: IUndoableQueue[];
  notificationDispatch: React.Dispatch<any>;
}
