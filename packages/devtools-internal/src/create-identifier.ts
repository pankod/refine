import type { TraceType } from "@refinedev/devtools-shared";
import type { MutationKey, QueryKey } from "@tanstack/react-query";

export const createIdentifier = (
  key?: QueryKey | MutationKey,
  trace?: TraceType[],
) => {
  const simpleTrace = trace?.map(
    (t) =>
      `${t.file}:${t.line}:${t.column}#${t.function}-${t.packageName}-${
        t.isRefine ? 1 : 0
      }`,
  );
  const str = JSON.stringify([...(key ?? []), ...(simpleTrace ?? [])]);

  return str;
};
