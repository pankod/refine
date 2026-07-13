import fromPairs from "lodash/fromPairs";
import zip from "lodash/zip";

import type { MapDataFn } from "../../../hooks/export/types";

export const importCSVMapper = <TItem = any, TVariables = any>(
  data: any[][],
  mapData: MapDataFn<TItem, TVariables> = (item) => item as any,
): TVariables[] => {
  const [headers, ...body] = data;
  return body
    .map((entry) => fromPairs(zip(headers, entry)))
    .map((item: any, index, array: any) =>
      mapData.call(undefined, item, index, array),
    );
};
