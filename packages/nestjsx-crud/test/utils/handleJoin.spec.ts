import {
  RequestQueryBuilder,
  type QueryJoin,
  type QueryJoinArr,
} from "@nestjsx/crud-request";
import { handleFilter, handleJoin, handleSort } from "../../src/utils";
import type { CrudFilters, CrudSorting } from "@refinedev/core";

describe("handleJoin", () => {
  it("should apply join to the query", () => {
    let query = RequestQueryBuilder.create();

    const join: QueryJoin | QueryJoinArr | (QueryJoin | QueryJoinArr)[] = [
      {
        field: "profile",
        select: ["name", "age"],
      },
      {
        field: "posts",
        select: ["title", "content"],
      },
    ];

    query = handleJoin(query, join);

    expect(decodeURIComponent(query.query())).toEqual(
      "join[0]=profile||name,age&join[1]=posts||title,content",
    );
  });

  it("should not apply join if none is provided", () => {
    let query = RequestQueryBuilder.create();

    query = handleJoin(query);

    expect(query.query()).toEqual("");
  });

  it("should work with complex sort and filter parameters", () => {
    let query = RequestQueryBuilder.create();

    const sorters: CrudSorting = [
      {
        field: "name",
        order: "asc",
      },
    ];

    const filters: CrudFilters = [
      {
        field: "age",
        operator: "gte",
        value: 18,
      },
      {
        field: "email",
        operator: "eq",
        value: "john",
      },
    ];

    const join: QueryJoin | QueryJoinArr | (QueryJoin | QueryJoinArr)[] = [
      {
        field: "profile",
        select: ["name", "age"],
      },
      {
        field: "posts",
        select: ["title", "content"],
      },
    ];

    query = handleJoin(query, join);
    query = handleSort(query, sorters);
    query = handleFilter(query, filters);

    const expectedQuery =
      'join[0]=profile||name,age&join[1]=posts||title,content&sort[0]=name,ASC&s={"$and":[{"age":{"$gte":18}},{"email":{"$eq":"john"}}]}';

    expect(decodeURIComponent(query.query())).toEqual(expectedQuery);
  });
});
