import type { Activity } from "src/interfaces/activity";
import get from "lodash/get";

export const getResourceValue = (activity: Activity): string => {
  const { resourcePath } = activity;
  let resource: string | null = null;

  if (activity?.resourceName) {
    resource = activity.resourceName;
  } else {
    if (resourcePath) {
      resource = get(activity, resourcePath) ?? "-";
    } else {
      resource = "-";
    }
  }

  if (resource && typeof resource === "string") {
    resource = resource.charAt(0).toUpperCase() + resource.slice(1);
  }

  return resource ?? "-";
};
