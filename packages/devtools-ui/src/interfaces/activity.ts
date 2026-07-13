import type {
  DevtoolsEvent,
  DevtoolsEventPayloads,
} from "@refinedev/devtools-shared";

export type Activity =
  DevtoolsEventPayloads[DevtoolsEvent.DEVTOOLS_ACTIVITY_UPDATE]["updatedActivities"][number];
