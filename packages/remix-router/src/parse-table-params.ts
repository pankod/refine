import qs from "qs";
import { type ParsedParams, QS_PARSE_DEPTH } from "@refinedev/core";

export const parseTableParams = (search: string) => {
  const parsed: ParsedParams = qs.parse(search, {
    ignoreQueryPrefix: true,
    depth: QS_PARSE_DEPTH,
  });

  const tableReady = {
    ...parsed,
    pagination: {
      currentPage: parsed.currentPage,
      pageSize: parsed.pageSize,
    },
  };

  delete tableReady.currentPage;
  delete tableReady.pageSize;

  return tableReady;
};
