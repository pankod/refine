import type { DevtoolsEvent, DevtoolsEventPayloads } from "./event-types";

export async function send<T extends DevtoolsEvent>(
  ws: WebSocket,
  event: T,
  payload: DevtoolsEventPayloads[T],
) {
  // check if the socket is open
  // if not, wait for it to open
  if (ws.readyState !== ws.OPEN) {
    await new Promise<void>((resolve) => {
      const listener = () => {
        ws.send(JSON.stringify({ event, payload }));
        resolve();
        ws.removeEventListener("open", listener);
      };

      ws.addEventListener("open", listener);
    });
    return;
  }
  ws.send(JSON.stringify({ event, payload }));
  return;
}
