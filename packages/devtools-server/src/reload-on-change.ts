import fs from "fs";
import path from "path";
import debounce from "lodash/debounce";
import { DevtoolsEvent, send } from "@refinedev/devtools-shared";

import type { Server } from "ws";
import { OPEN } from "ws";

export const reloadOnChange = __DEVELOPMENT__
  ? (ws: Server) => {
      const reloadEmitter = debounce(() => {
        setTimeout(() => {
          ws.clients.forEach((client) => {
            if (client.readyState === OPEN) {
              console.log("Reloading connected client...");
              send(client as any, DevtoolsEvent.RELOAD, {});
            }
          });
        }, 800);
      }, 1000);

      const watcher = fs.watch(
        path.resolve(__dirname, "client"),
        { recursive: true },
        reloadEmitter,
      );

      process.on("SIGTERM", () => {
        watcher.close();
      });
    }
  : () => 0;
