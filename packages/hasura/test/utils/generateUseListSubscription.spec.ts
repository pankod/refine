import type { MetaQuery, Pagination, CrudSorting } from "@refinedev/core";
import {
  type HasuraCrudFilters,
  generateUseListSubscription,
  genereteUseListSubscription,
} from "../../src/utils";

describe("generateUseListSubscription", () => {
  const resource = "post";
  const meta: MetaQuery = {
    operation: "posts",
    fields: ["id", "title", "createdAt"],
  };
  const pagination: Pagination = {
    currentPage: 2,
    pageSize: 5,
    mode: "server",
  };
  const sorters: CrudSorting = [{ field: "title", order: "asc" }];
  const filters: HasuraCrudFilters = [
    { field: "published", operator: "eq", value: true },
  ];

  it("should generate a valid useListSubscription query with pagination, sorters, and filters", () => {
    const { query, variables, operation } = generateUseListSubscription({
      resource,
      meta,
      pagination,
      sorters,
      filters,
    });

    expect(operation).toEqual(meta.operation);
    expect(query).toContain(meta.operation);
    expect(query).toMatch(/id/);
    expect(query).toMatch(/title/);
    expect(query).toMatch(/createdAt/);
    expect(variables).toEqual({
      limit: 5,
      offset: 5,
      order_by: { title: "asc" },
      where: { _and: [{ published: { _eq: true } }] },
    });
  });

  it("should generate a valid useListSubscription query without pagination, sorters, or filters", () => {
    const { query, variables, operation } = generateUseListSubscription({
      resource,
      meta,
    });

    expect(operation).toEqual(meta.operation);
    expect(query).toContain(meta.operation);
    expect(variables).toEqual({ limit: 10, offset: 0 });
  });

  it("should generate a subscription without pagination when mode is client ", () => {
    const { variables } = generateUseListSubscription({
      resource,
      meta,
      pagination: { ...pagination, mode: "client" },
      sorters,
      filters,
    });

    expect(variables).toEqual({
      order_by: { title: "asc" },
      where: { _and: [{ published: { _eq: true } }] },
    });
  });

  it("should be genereteUseListSubscription(deprecated) and equal to generateUseListSubscription", () => {
    expect(
      genereteUseListSubscription({
        resource,
        meta,
        pagination,
        sorters,
        filters,
      }),
    ).toEqual(
      generateUseListSubscription({
        resource,
        meta,
        pagination,
        sorters,
        filters,
      }),
    );
  });
});
