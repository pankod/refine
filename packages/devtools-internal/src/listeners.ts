import { DevtoolsEvent, send } from "@refinedev/devtools-shared";
import type { Mutation, Query } from "@tanstack/react-query";

import { createIdentifier } from "./create-identifier";
import type { XRayResponse } from "./get-xray";

export const createMutationListener =
  (ws: WebSocket) => (mutation?: Mutation) => {
    if (!mutation?.meta?.trace) return;

    const meta: XRayResponse = mutation?.meta as any;

    new Promise<void>((resolve) => {
      send(ws, DevtoolsEvent.ACTIVITY, {
        type: "mutation",
        identifier: createIdentifier(
          mutation?.options.mutationKey,
          mutation?.meta?.trace as any,
        ),
        key: mutation?.options.mutationKey as any,
        status: mutation?.state.status,
        state: mutation?.state,
        variables: mutation?.state?.variables,
        ...meta,
      });
      resolve();
    });
  };

export const createQueryListener = (ws: WebSocket) => (query: Query) => {
  if (!query?.meta?.trace) return;

  const meta: XRayResponse = query?.meta as any;

  new Promise<void>((resolve) => {
    send(ws, DevtoolsEvent.ACTIVITY, {
      type: "query",
      identifier: createIdentifier(query.queryKey, query.meta?.trace as any),
      key: query.queryKey as any,
      status: query.state.status,
      state: query.state,
      ...meta,
    });
    resolve();
  });
};
