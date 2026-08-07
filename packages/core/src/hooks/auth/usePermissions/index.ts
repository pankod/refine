import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { useAuthProviderContext } from "@contexts/auth";
import { useKeys } from "@hooks/useKeys";
import type { PermissionResponse } from "../../../contexts/auth/types";

export type UsePermissionsProps<
  TData = PermissionResponse,
  TParams extends Record<string, any> = Record<string, any>,
> = {
  options?: UseQueryOptions<TData>;
  params?: TParams;
};
export type UsePermissionsReturnType<TData = PermissionResponse> =
  UseQueryResult<TData, unknown>;

/**
 * `usePermissions` calls `getPermissions` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/usePermissions} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
export function usePermissions<
  TData = any,
  TParams extends Record<string, any> = Record<string, any>,
>({
  options,
  params,
}: UsePermissionsProps<TData, TParams>): UsePermissionsReturnType<TData> {
  const { getPermissions } = useAuthProviderContext();
  const { keys } = useKeys();

  const queryResponse = useQuery<TData>({
    queryKey: keys().auth().action("permissions").get(),
    queryFn: (getPermissions
      ? () => getPermissions(params)
      : () => Promise.resolve(undefined)) as (
      params?: unknown,
    ) => Promise<TData>,
    enabled: !!getPermissions,
    ...options,
    meta: {
      ...options?.meta,
      ...getXRay("usePermissions"),
    },
  });

  return queryResponse;
}
