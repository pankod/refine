import type { IResourceItem } from "../../../contexts/resource/types";
import type { Action } from "../../../contexts/router/types";

export type ResourceActionRoute = {
  action: Action;
  resource: IResourceItem;
  route: string;
};

/**
 * This function returns all the routes for available actions for a resource.
 * - It will return an array of objects with the action, the resource and the route
 */
export const getActionRoutesFromResource = (
  resource: IResourceItem,
  resources: IResourceItem[],
) => {
  const actions: ResourceActionRoute[] = [];

  const actionList: Action[] = ["list", "show", "edit", "create", "clone"];

  actionList.forEach((action) => {
    const route: string | undefined = resource[action];

    if (route) {
      actions.push({
        action,
        resource,
        route: `/${route.replace(/^\//, "")}`,
      });
    }
  });

  return actions;
};
