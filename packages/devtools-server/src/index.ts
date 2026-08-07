import express from "express";

import { DevtoolsEvent, receive, send } from "@refinedev/devtools-shared";

import { serveClient } from "./serve-client";
import { serveWs } from "./serve-ws";
import { reloadOnChange } from "./reload-on-change";
import { setupServer } from "./setup-server";
import { type Activity, createDb } from "./create-db";
import { serveApi } from "./serve-api";
import { serveOpenInEditor } from "./serve-open-in-editor";

type Options = {
  projectPath?: string;
  onError?: () => void;
};

export const server = async ({
  projectPath = process.cwd(),
  onError = () => {
    process.exit(1);
  },
}: Options = {}) => {
  return new Promise((_, reject) => {
    const app = express();
    const server = setupServer(app, () => {
      reject();
      onError();
    });
    const ws = serveWs(server, () => {
      reject();
      onError();
    });

    const db = createDb();

    ws.on("connection", (client) => {
      // Initialize development client
      receive(client as any, DevtoolsEvent.DEVTOOLS_INIT, (data) => {
        if (db.connectedApp) {
          // send client the devtools client url if already connected
          send(client as any, DevtoolsEvent.DEVTOOLS_ALREADY_CONNECTED, {
            url: db.connectedApp,
          });
        } else {
          db.connectedApp = data.url;
          db.clientWs = client;

          ws.clients.forEach((c) => {
            send(c as any, DevtoolsEvent.DEVTOOLS_CONNECTED_APP, {
              url: db.connectedApp,
            });
          });
        }
      });

      receive(client as any, DevtoolsEvent.ACTIVITY, (data) => {
        // match by identifier, if identifier is same, update data instead of pushing
        const index = db.activities.findIndex(
          (activity) => activity.identifier === data.identifier,
        );

        const record: Activity = {
          ...data,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        if (index > -1) {
          record.createdAt = db.activities[index].createdAt;

          db.activities[index] = record;
        } else {
          db.activities.push(record);
        }

        ws.clients.forEach((c) => {
          send(c as any, DevtoolsEvent.DEVTOOLS_ACTIVITY_UPDATE, {
            updatedActivities: [record],
          });
        });
      });

      receive(
        client as any,
        DevtoolsEvent.DEVTOOLS_HIGHLIGHT_IN_MONITOR,
        ({ name }) => {
          ws.clients.forEach((c) => {
            send(c as any, DevtoolsEvent.DEVTOOLS_HIGHLIGHT_IN_MONITOR_ACTION, {
              name,
            });
          });
        },
      );

      receive(
        client as any,
        DevtoolsEvent.DEVTOOLS_INVALIDATE_QUERY,
        ({ queryKey }) => {
          ws.clients.forEach((c) => {
            send(c as any, DevtoolsEvent.DEVTOOLS_INVALIDATE_QUERY_ACTION, {
              queryKey,
            });
          });
        },
      );

      // close connected app if client disconnects
      client.on("close", (_, reason) => {
        if (__DEVELOPMENT__) {
          console.log("Client disconnected", ws.clients.size);
        }

        if (db.clientWs) {
          if (!ws.clients.has(db.clientWs)) {
            db.clientWs = null;
            db.connectedApp = null;

            db.activities = [];

            ws.clients.forEach((c) => {
              send(c as any, DevtoolsEvent.DEVTOOLS_DISCONNECTED_APP, {
                url: db.connectedApp,
              });
            });
          }
        }
      });

      if (__DEVELOPMENT__) {
        console.log("Client connected", ws.clients.size);
      }
    });

    reloadOnChange(ws);
    serveClient(app);
    serveApi(app, db);
    serveOpenInEditor(app, projectPath);

    process.on("SIGTERM", () => {
      reject();
    });
  });
};
