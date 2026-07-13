import { useContext } from "react";

import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { useKeys } from "@hooks/useKeys";

import type { HttpError } from "../../../contexts/data/types";
import type { MakeOptional } from "../../../definitions/types";

export type UseLogProps<TQueryFnData, TError, TData> = {
  resource: string;
  action?: string;
  meta?: Record<number | string, any>;
  author?: Record<number | string, any>;
  queryOptions?: MakeOptional<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >;
};

/**
 * useLogList is used to get and filter audit logs.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/audit-log/useLogList} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function.
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Defaults to `TQueryFnData`
 *
 */
export const useLogList = <
  TQueryFnData = any,
  TError extends HttpError = HttpError,
  TData = TQueryFnData,
>({
  resource,
  action,
  meta,
  author,
  queryOptions,
}: UseLogProps<TQueryFnData, TError, TData>): UseQueryResult<TData, TError> => {
  const { get } = useContext(AuditLogContext);
  const { keys } = useKeys();

  const queryResponse = useQuery<TQueryFnData, TError, TData>({
    queryKey: keys()
      .audit()
      .resource(resource)
      .action("list")
      .params(meta)
      .get(),
    queryFn: () =>
      get?.({
        resource,
        action,
        author,
        meta,
      }) ?? Promise.resolve([]),
    enabled: typeof get !== "undefined",
    ...queryOptions,
    retry: false,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("useLogList", resource),
    },
  });

  return queryResponse;
};
