import type { GetListResponse } from "../../../contexts/data/types";

export const getNextPageParam = (lastPage: GetListResponse) => {
  const { pagination, cursor } = lastPage;

  // cursor pagination
  if (cursor?.next) {
    return cursor.next;
  }

  const current = pagination?.currentPage || 1;

  const pageSize = pagination?.pageSize || 10;
  const totalPages = Math.ceil((lastPage.total || 0) / pageSize);

  return current < totalPages ? Number(current) + 1 : undefined;
};

export const getPreviousPageParam = (lastPage: GetListResponse) => {
  const { pagination, cursor } = lastPage;

  // cursor pagination
  if (cursor?.prev) {
    return cursor.prev;
  }

  const current = pagination?.currentPage || 1;

  return current === 1 ? undefined : current - 1;
};
