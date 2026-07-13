import type { LiveEvent } from "@refinedev/core";
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from "@supabase/supabase-js";

export const liveTypes: Record<
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  LiveEvent["type"]
> = {
  INSERT: "created",
  UPDATE: "updated",
  DELETE: "deleted",
  "*": "*",
};

export const supabaseTypes: Record<
  LiveEvent["type"],
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT
> = {
  created: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
  updated: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE,
  deleted: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.DELETE,
  "*": REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
};
