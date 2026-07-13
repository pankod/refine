import type { RequestQueryBuilder } from "@nestjsx/crud-request";
import type { Pagination } from "@refinedev/core";

export const handlePagination = (
  query: RequestQueryBuilder,
  pagination?: Pagination,
) => {
  const { currentPage = 1, pageSize = 10, mode = "server" } = pagination ?? {};

  if (mode === "server") {
    query
      .setLimit(pageSize)
      .setPage(currentPage)
      .setOffset((currentPage - 1) * pageSize);
  }

  return query;
};
