import type { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

type Context =
  | QueryFunctionContext<QueryKey, any>
  | QueryFunctionContext<QueryKey, never>;

type QueryContextMeta<TMeta extends Record<string, unknown> | undefined> =
  (TMeta extends Record<string, unknown> ? TMeta : Record<string, never>) &
    Pick<Context, "queryKey" | "signal">;

export const prepareQueryContext = (
  context: Context,
  meta?: Record<string, unknown>,
): QueryContextMeta<typeof meta> => {
  const queryContext = {
    ...(meta ?? {}),
    queryKey: context.queryKey,
  } as QueryContextMeta<typeof meta>;

  Object.defineProperty(queryContext, "signal", {
    enumerable: true,
    get: () => {
      return context.signal;
    },
  });

  return queryContext;
};
