import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { useAuthProviderContext } from "@contexts/auth";
import { useKeys } from "@hooks";

import type { CheckResponse } from "../../../contexts/auth/types";

export type UseIsAuthenticatedProps = {
  // Make queryKey and queryFn optional
  queryOptions?: Omit<UseQueryOptions<CheckResponse>, "queryKey" | "queryFn">;
  params?: any;
};

export type UseIsAuthenticatedReturnType = UseQueryResult<CheckResponse, any>;

/**
 * `useIsAuthenticated` calls `check` method from {@link https://refine.dev/docs/authentication/auth-provider/#check   `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useIsAuthenticated} for more details.
 *
 */
export function useIsAuthenticated({
  queryOptions,
  params,
}: UseIsAuthenticatedProps = {}): UseIsAuthenticatedReturnType {
  const { check } = useAuthProviderContext();
  const { keys } = useKeys();

  const queryResponse = useQuery<CheckResponse>({
    queryKey: keys().auth().action("check").get(),
    queryFn: async () => (await check?.(params)) ?? { authenticated: true },
    retry: false,
    ...queryOptions,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("useIsAuthenticated"),
    },
  });

  return queryResponse;
}
