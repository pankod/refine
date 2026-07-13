import type { Activity } from "src/interfaces/activity";

export const getOwners = (activity: Activity) => {
  return activity.trace?.filter((t) => !t.isRefine) ?? [];
};
