import React from "react";
import warnOnce from "warn-once";

import type { IResourceItem } from "../../../contexts/resource/types";
import type { Action } from "../../../contexts/router/types";
import { getActionRoutesFromResource } from "../../../definitions/helpers/router";
import { composeRoute } from "../../../definitions/helpers/router/compose-route";
import { useResourceParams } from "../../use-resource-params";
import { useParsed } from "../use-parsed";

type UseToPathParams = {
  resource?: IResourceItem;
  action: Action;
  meta?: Record<string, unknown>;
};

type GetToPathFn = (params: UseToPathParams) => string | undefined;

/**
 * Returns a function to get the route for a given action and resource.
 * If resource is not provided, it will use the resource from the route.
 * If the resource is not found, it will return undefined.
 * If the action is not found, it will return undefined.
 * `meta` can be provided to compose the routes with parameters. (Can be used for nested routes.)
 */
export const useGetToPath = (): GetToPathFn => {
  const { resource: resourceFromRoute, resources } = useResourceParams();
  const parsed = useParsed();

  const fn = React.useCallback(
    ({ resource, action, meta }: UseToPathParams): string | undefined => {
      const selectedResource = resource || resourceFromRoute;

      if (!selectedResource) {
        return undefined;
      }

      // Always get the full resource from resources array to ensure we have all action routes
      // Priority: identifier match > name match
      const fullResource =
        resources.find((r) => {
          // to avoid matching undefined identifiers
          if (!r.identifier) return false;
          if (!selectedResource.identifier) return false;
          return r.identifier === selectedResource.identifier;
        }) ??
        resources.find((r) => {
          // to avoid matching undefined identifiers
          if (!r.identifier) return false;
          return r.identifier === selectedResource.name;
        }) ??
        resources.find((r) => r.name === selectedResource.name) ??
        selectedResource;

      const actionRoutes = getActionRoutesFromResource(fullResource, resources);

      const actionRoute = actionRoutes.find(
        (item) => item.action === action,
      )?.route;

      if (!actionRoute) {
        warnOnce(
          true,
          `[useGetToPath]: Could not find a route for the "${action}" action of the "${selectedResource.name}" resource. Please make sure that the resource has the "${action}" property defined.`,
        );
        return undefined;
      }

      const composed = composeRoute(
        actionRoute,
        fullResource?.meta,
        parsed,
        meta,
      );

      return composed;
    },
    [resources, resourceFromRoute, parsed],
  );

  return fn;
};
