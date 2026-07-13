import { RequestQueryBuilder, type QuerySort } from "@nestjsx/crud-request";
import type { CrudFilters, CrudSorting } from "@refinedev/core";
import { handleFilter, generateSort, handleSort } from "../../src/utils";

describe("handleSort", () => {
  it("should not modify the query if no sorters are provided", () => {
    let query = RequestQueryBuilder.create();
    const initialQuery = query.query();

    const sorters: CrudSorting = [];

    query = handleSort(query, sorters);

    expect(query.query()).toEqual(initialQuery);
  });

  it("should add sortBy to the query if sorters are provided", () => {
    let query = RequestQueryBuilder.create();

    const sorters: CrudSorting = [
      {
        field: "field1",
        order: "asc",
      },
      {
        field: "field2",
        order: "desc",
      },
    ];

    query = handleSort(query, sorters);

    const expectedSortBy = "sort[0]=field1,ASC&sort[1]=field2,DESC";
    expect(decodeURIComponent(query.query())).toEqual(expectedSortBy);
  });

  it("should ignore invalid sort entries", () => {
    let query = RequestQueryBuilder.create();

    const sorters: CrudSorting = [
      {
        field: "field1",
        order: "asc",
      },
      {
        field: "",
        order: "desc",
      },
    ];

    query = handleSort(query, sorters);

    const expectedSortBy = "sort[0]=field1,ASC";
    expect(decodeURIComponent(query.query())).toEqual(expectedSortBy);
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

    query = handleSort(query, sorters);
    query = handleFilter(query, filters);

    const expectedQuery =
      'sort[0]=name,ASC&s={"$and":[{"age":{"$gte":18}},{"email":{"$eq":"john"}}]}';

    expect(decodeURIComponent(query.query())).toEqual(expectedQuery);
  });
});

describe("generateSort", () => {
  it("should return undefined when no sorting is provided", () => {
    expect(generateSort()).toBeUndefined();
  });

  it("should generate an array of sort objects when sorting is provided", () => {
    const sort: CrudSorting = [
      {
        field: "field1",
        order: "asc",
      },
      {
        field: "field2",
        order: "desc",
      },
    ];

    const expectedSort: QuerySort[] = [
      {
        field: "field1",
        order: "ASC",
      },
      {
        field: "field2",
        order: "DESC",
      },
    ];

    expect(generateSort(sort)).toEqual(expectedSort);
  });

  it("should ignore invalid sort entries", () => {
    const sort: CrudSorting = [
      {
        field: "field1",
        order: "asc",
      },
      {
        field: "",
        order: "desc",
      },
    ];

    const expectedSort: QuerySort[] = [
      {
        field: "field1",
        order: "ASC",
      },
    ];

    expect(generateSort(sort)).toEqual(expectedSort);
  });

  it("should return undefined when array is empty", () => {
    const sort: CrudSorting = [];

    expect(generateSort(sort)).toBeUndefined();
  });
});
