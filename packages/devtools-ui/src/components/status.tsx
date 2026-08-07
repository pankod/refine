import React from "react";
import type { Activity } from "src/interfaces/activity";

export const Status = ({ activity }: { activity: Activity }) => {
  const status = activity.status;

  const dataUpdateCount =
    activity.type === "query" ? activity.state.dataUpdateCount : 0;
  const fetchStatus =
    activity.type === "query" ? activity.state.fetchStatus : "idle";

  let state: typeof status | "initial" | "refetching" = status;

  if (status === "pending" && dataUpdateCount === 0) {
    state = "initial";
  }
  if (
    (status === "success" || status === "error") &&
    fetchStatus === "fetching"
  ) {
    state = "refetching";
  }

  switch (state) {
    case "initial":
    case "idle":
      return <span className="re-text-gray-500 re-capitalize">{state}</span>;
    case "pending":
    case "refetching":
      return <span className="re-text-alt-yellow re-capitalize">{state}</span>;
    case "error":
      return <span className="re-text-alt-red re-capitalize">{state}</span>;
    case "success":
      return <span className="re-text-alt-green re-capitalize">{state}</span>;
    default:
      return <span>{state}</span>;
  }
};
