import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseQueryResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { useAuthProviderContext } from "@contexts/auth";
import { useKeys } from "@hooks";
import type { MakeOptional } from "../../../definitions/types";

export type UseGetIdentityProps<TData = any> = {
  queryOptions?: MakeOptional<UseQueryOptions<TData>, "queryKey" | "queryFn">;
};

export type UseGetIdentityReturnType<TData> = UseQueryResult<TData>;

/**
 * `useGetIdentity` calls `getIdentity` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useGetIdentity} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
export function useGetIdentity<TData = any>({
  queryOptions,
}: UseGetIdentityProps<TData> = {}): UseGetIdentityReturnType<TData> {
  const { getIdentity } = useAuthProviderContext();
  const { keys } = useKeys();

  const queryResponse = useQuery<TData>({
    queryKey: keys().auth().action("identity").get(),
    queryFn:
      (getIdentity as (params?: unknown) => Promise<TData>) ??
      (() => Promise.resolve({})),
    retry: false,
    enabled: !!getIdentity,
    ...queryOptions,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("useGetIdentity"),
    },
  });

  return queryResponse;
}
