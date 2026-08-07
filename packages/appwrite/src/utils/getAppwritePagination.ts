import { Query } from "appwrite";

export const getAppwritePagination = (
  currentPage: number,
  pageSize: number,
) => {
  return [Query.offset((currentPage - 1) * pageSize), Query.limit(pageSize)];
};
