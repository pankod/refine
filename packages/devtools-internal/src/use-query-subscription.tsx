import {
  DevToolsContext,
  DevtoolsEvent,
  receive,
} from "@refinedev/devtools-shared";
import type { QueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { createQueryListener, createMutationListener } from "./listeners";

const empty = {};
const noop = () => empty;

export const useQuerySubscription =
  __DEV_CONDITION__ !== "development"
    ? noop
    : (queryClient: QueryClient) => {
        const { ws } = useContext(DevToolsContext);
        const queryCacheSubscription = React.useRef<() => void>(noop);
        const mutationCacheSubscription = React.useRef<() => void>(noop);

        React.useEffect(() => {
          if (!ws) return () => 0;

          const queryCache = queryClient.getQueryCache();

          const queryListener = createQueryListener(ws);

          queryCache.getAll().forEach(queryListener);

          queryCacheSubscription.current = queryCache.subscribe(
            ({ query, type }) =>
              (type === "added" || type === "updated") && queryListener(query),
          );

          return () => {
            queryCacheSubscription.current?.();
          };
        }, [ws, queryClient]);

        React.useEffect(() => {
          if (!ws) return () => 0;

          const mutationCache = queryClient.getMutationCache();

          const mutationListener = createMutationListener(ws);

          mutationCache.getAll().forEach(mutationListener);

          mutationCacheSubscription.current = mutationCache.subscribe(
            ({ mutation, type }) =>
              (type === "added" || type === "updated") &&
              mutationListener(mutation),
          );

          return () => {
            mutationCacheSubscription.current?.();
          };
        }, [ws, queryClient]);

        React.useEffect(() => {
          if (!ws) return () => 0;

          const cb = receive(
            ws,
            DevtoolsEvent.DEVTOOLS_INVALIDATE_QUERY_ACTION,
            ({ queryKey }) => {
              if (queryKey) {
                queryClient.invalidateQueries({ queryKey });
              }
            },
          );

          return cb;
        }, [ws, queryClient]);

        return {};
      };
