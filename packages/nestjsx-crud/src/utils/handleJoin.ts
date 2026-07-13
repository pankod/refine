import type {
  RequestQueryBuilder,
  QueryJoin,
  QueryJoinArr,
} from "@nestjsx/crud-request";

export const handleJoin = (
  query: RequestQueryBuilder,
  join?: QueryJoin | QueryJoinArr | (QueryJoin | QueryJoinArr)[],
) => {
  if (join) {
    query.setJoin(join);
  }
  return query;
};
