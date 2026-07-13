import type { RefineHook, TraceType } from "@refinedev/devtools-shared";
import { getTrace } from "./get-trace";
import { getResourcePath } from "./get-resource-path";

export type XRayResponse = {
  hookName: string;
  trace: TraceType[];
  resourcePath: string | null;
  resourceName?: string;
};

export function getXRay(
  hookName: string,
  resourceName?: string,
  excludeFromTrace?: string[],
): XRayResponse {
  if (__DEV_CONDITION__ !== "development") {
    return {
      hookName: "",
      trace: [],
      resourcePath: null,
    };
  }
  const trace = getTrace(excludeFromTrace).slice(1);

  const resourcePath = getResourcePath(hookName as RefineHook);

  return {
    hookName,
    trace,
    resourcePath,
    resourceName,
  };
}
