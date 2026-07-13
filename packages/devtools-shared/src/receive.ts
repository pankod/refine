// receive ws message by adding a listener to the ws object

import type { DevtoolsEvent, DevtoolsEventPayloads } from "./event-types";

export function receive<T extends DevtoolsEvent>(
  ws: WebSocket,
  event: T,
  callback: (payload: DevtoolsEventPayloads[T]) => void,
) {
  const listener = (e: MessageEvent) => {
    const { event: receivedEvent, payload } = JSON.parse(e.data);
    if (event === receivedEvent) {
      callback(payload);
    }
  };

  ws.addEventListener("message", listener);

  return () => {
    ws.removeEventListener("message", listener);
  };
}
