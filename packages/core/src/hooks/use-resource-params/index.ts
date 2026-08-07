import React, { useContext } from "react";

import { ResourceContext } from "@contexts/resource";
import { useId } from "./use-id";
import { useAction } from "./use-action";
import type { BaseKey } from "../../contexts/data/types";
import type { IResourceItem } from "../../contexts/resource/types";
import type { Action } from "../../contexts/router/types";
import type { FormAction } from "../form/types";
import { type SelectReturnType, useResource } from "./use-resource";

type Props = {
  id?: BaseKey;
  resource?: string;
  action?: Action;
};

type ResourceParams = {
  id?: BaseKey;
  setId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
  resource?: IResourceItem;
  resources: IResourceItem[];
  action?: Action;
  identifier?: string;
  formAction: FormAction;
  select: <T extends boolean = true>(
    resourceName: string,
    force?: T,
  ) => SelectReturnType<T>;
};

/**
 * Interactions in Refine has 3 main parameters: resource, action and id.
 *
 * This hook is used to manage these parameters based on below conditions and outputs the final parameters.
 *
 * `resource`: The resource to be used. (either the identifier or the name of the resource)
 * - If a `resource` is provided, it will be used (even if it's not defined in the <Refine/> component)
 * - If a `resource` is not provided, it will be inferred from the route.
 * `id`: The `id` of the record to be used.
 * - If an `id` is provided, it will be used.
 * - If an `id` is not provided, it will either be inferred from the route or will be `undefined`.
 * -- If a custom resource is provided and it's different from the inferred resource, the id will be undefined.
 * -- If a custom resource is provided and it's same as the inferred resource, the id will be inferred from the route.
 * -- If a custom resource is not provided, the id will be inferred from the route.
 * `action`: The action to be used.
 * - If an `action` is provided, it will be used.
 * - If an `action` is not provided, it will be inferred from the route.
 * `formAction`: The action to be used in the form.
 * - `formAction` can only be "edit", "clone" or "create".
 * - If action is "edit" or "clone", `formAction` will be the same as action.
 * - Same as `id`, if passed resource is different from inferred resource, `formAction` will fallback to "create" and ignore the action from the route.
 */
export function useResourceParams(props?: Props): ResourceParams {
  const { resources } = useContext(ResourceContext);

  const {
    select,
    identifier: inferredIdentifier,
    resource: inferredResource,
  } = useResource();
  const resourceToCheck = props?.resource ?? inferredIdentifier;
  const { identifier = undefined, resource = undefined } = resourceToCheck
    ? select(resourceToCheck, true)
    : {};

  const isSameResource = inferredIdentifier === identifier;
  const inferredId = useId();
  const action = useAction(props?.action);

  const defaultId = React.useMemo(() => {
    if (!isSameResource) return props?.id;

    return props?.id ?? inferredId;
  }, [isSameResource, props?.id, inferredId]);

  const [id, setId] = React.useState<BaseKey | undefined>(defaultId);

  React.useMemo(() => setId(defaultId), [defaultId]);

  const formAction = React.useMemo(() => {
    if (!isSameResource && !props?.action) {
      return "create";
    }

    if (action === "edit" || action === "clone") {
      return action;
    }

    return "create";
  }, [action, isSameResource, props?.action]);

  return {
    id,
    setId,
    resource: resource || inferredResource,
    resources,
    action,
    identifier,
    formAction,
    select,
  };
}
