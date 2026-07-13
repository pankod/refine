import type { Pagination } from "../../../contexts/data/types";

type HandlePaginationParamsProps = {
  pagination?: Pagination;
};

export const handlePaginationParams = ({
  pagination,
}: HandlePaginationParamsProps = {}): Required<Pagination> => {
  const mode = pagination?.mode ?? "server";

  const currentPage = pagination?.currentPage ?? 1;

  const pageSize = pagination?.pageSize ?? 10;

  return {
    currentPage,
    pageSize,
    mode,
  };
};
