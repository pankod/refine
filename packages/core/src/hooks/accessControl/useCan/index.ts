import { useContext } from "react";

import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { AccessControlContext } from "@contexts/accessControl";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { useKeys } from "@hooks/useKeys";
import type {
  CanParams,
  CanReturnType,
} from "../../../contexts/accessControl/types";

export type UseCanProps = CanParams & {
  /**
   * TansSack Query's [useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) options
   */
  // Make queryKey and queryFn optional
  queryOptions?: Omit<UseQueryOptions<CanReturnType>, "queryKey"> & {
    queryKey?: UseQueryOptions<CanReturnType>["queryKey"];
  };
};

/**
 * `useCan` uses the `can` as the query function for `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/guides/queries `useQuery`}. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/accessControl/useCan} for more details.
 *
 * @typeParam CanParams {@link https://refine.dev/docs/core/interfaceReferences#canparams}
 * @typeParam CanReturnType {@link https://refine.dev/docs/core/interfaceReferences#canreturntype}
 *
 */
export const useCan = ({
  action,
  resource,
  params,
  queryOptions: hookQueryOptions,
}: UseCanProps): UseQueryResult<CanReturnType> => {
  const { can, options: globalOptions } = useContext(AccessControlContext);
  const { keys } = useKeys();

  const { queryOptions: globalQueryOptions } = globalOptions || {};

  const mergedQueryOptions = {
    ...globalQueryOptions,
    ...hookQueryOptions,
  };

  /**
   * Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
   * The feature in #2220(https://github.com/refinedev/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`
   */
  const { resource: _resource, ...paramsRest } = params ?? {};

  const sanitizedResource = sanitizeResource(_resource);

  const queryResponse = useQuery<CanReturnType>({
    queryKey: keys()
      .access()
      .resource(resource)
      .action(action)
      .params({
        params: { ...paramsRest, resource: sanitizedResource },
        enabled: mergedQueryOptions?.enabled,
      })
      .get(),
    // Enabled check for `can` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
    queryFn: () =>
      can?.({
        action,
        resource,
        params: { ...paramsRest, resource: sanitizedResource },
      }) ?? Promise.resolve({ can: true }),
    enabled: typeof can !== "undefined",
    ...mergedQueryOptions,
    meta: {
      ...mergedQueryOptions?.meta,
      ...getXRay("useCan", resource, [
        "useButtonCanAccess",
        "useNavigationButton",
      ]),
    },
    retry: false,
  });

  return typeof can === "undefined"
    ? ({ data: { can: true } } as typeof queryResponse)
    : queryResponse;
};
