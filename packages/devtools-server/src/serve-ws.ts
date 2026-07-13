import WebSocket from "ws";
import { SERVER_PORT } from "./constants";
import { bold, cyanBright } from "chalk";
import type http from "http";

export const serveWs = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
  onError: () => void,
) => {
  const ws = new WebSocket.Server({ server }).on("error", (error: any) => {
    if (error?.code === "EADDRINUSE") {
      console.error(
        `\n${cyanBright.bold("\u2717 ")}${bold(
          "Refine Devtools server",
        )} (websocket) failed to start. Port ${SERVER_PORT} is already in use.\n`,
      );
    } else {
      console.error(
        `\n${cyanBright.bold("\u2717 ")}${bold("error from refine devtools")}`,
        error,
      );
    }
    ws.close(() => {
      if (__DEVELOPMENT__) {
        console.log("Process terminated");
      }
    });
    onError();
  });

  ws.on("connection", (client) => {
    client.on("close", () => {
      client.terminate();
    });
  });

  process.on("SIGTERM", () => {
    ws.close(() => {
      if (__DEVELOPMENT__) {
        console.log("Process terminated");
      }
    });
  });

  return ws;
};
