import type {
  DevtoolsEvent,
  DevtoolsEventPayloads,
} from "@refinedev/devtools-shared";
import type { WebSocket } from "ws";

export type Activity =
  DevtoolsEventPayloads[DevtoolsEvent.DEVTOOLS_ACTIVITY_UPDATE]["updatedActivities"][number];

export type Data = {
  connectedApp: null | string;
  clientWs: null | WebSocket;
  devtoolsWsClients: WebSocket[];
  appWsClients: WebSocket[];
  activities: Activity[];
  packages: string[];
};

const defaultData: Data = {
  connectedApp: null,
  clientWs: null,
  // connections
  devtoolsWsClients: [],
  appWsClients: [],
  // data
  activities: [],
  packages: [],
};

export const createDb = (): Data => {
  return {
    ...defaultData,
  };
};
