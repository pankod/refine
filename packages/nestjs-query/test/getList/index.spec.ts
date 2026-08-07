import gql from "graphql-tag";

import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("getList", () => {
  describe("gql", () => {
    it("correct response for query", async () => {
      const { data, total } = await dataProvider(client).getList<{
        id: string;
        status: string;
        category: { id: string };
      }>({
        resource: "blog_posts",
        pagination: {
          currentPage: 2,
          pageSize: 5,
          mode: "server",
        },
        filters: [
          { field: "id", operator: "lt", value: 500 },
          { field: "status", operator: "eq", value: "PUBLISHED" },
          { field: "category.id", operator: "eq", value: 1 },
        ],
        sorters: [{ field: "id", order: "desc" }],
        meta: {
          gqlQuery: gql`
                        query BlogPostsList(
                            $paging: OffsetPaging!
                            $filter: BlogPostFilter
                            $sorting: [BlogPostSort!]!
                        ) {
                            blogPosts(
                                paging: $paging
                                filter: $filter
                                sorting: $sorting
                            ) {
                                nodes {
                                    id
                                    status
                                    category {
                                        id
                                    }
                                }
                                totalCount
                            }
                        }
                    `,
        },
      });

      expect(total).toBe(13);
      expect(data.length).toBe(5);
      expect(+data[0].id).toBeGreaterThan(+data[1].id);
      data.forEach((item) => expect(item.status).toBe("PUBLISHED"));
      data.forEach((item) => expect(item.category.id).toBe("1"));
    });
  });

  describe("fields (legacy)", () => {
    it("correct response", async () => {
      const { data, total } = await dataProvider(client).getList({
        resource: "blog_posts",
        meta: {
          fields: ["id", "title"],
        },
      });

      data.forEach((item) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("title");
      });

      expect(total).toBeGreaterThan(0);
    });

    describe("sorters", () => {
      describe("single sorter", () => {
        it("should return sorted data", async () => {
          const { data } = await dataProvider(client).getList({
            resource: "blog_posts",
            meta: {
              fields: ["id"],
            },
            sorters: [{ field: "id", order: "desc" }],
          });

          expect(Number(data[0]["id"])).toBeGreaterThan(Number(data[1]["id"]));
        });
      });

      describe("multiple sorters", () => {
        it("should return sorted data", async () => {
          const { data } = await dataProvider(client).getList({
            resource: "blog_posts",
            meta: {
              fields: ["id", "status"],
            },
            sorters: [
              { field: "status", order: "asc" },
              { field: "id", order: "desc" },
            ],
          });

          expect(Number(data[0]["id"])).toBeGreaterThan(Number(data[1]["id"]));

          data.forEach((item) => {
            expect(item["status"]).toBe("DRAFT");
          });
        });
      });
    });

    describe("pagination", () => {
      describe("server mode", () => {
        it("should return paginated results", async () => {
          const { data, total } = await dataProvider(client).getList({
            resource: "blog_posts",
            meta: {
              fields: ["id"],
            },
            pagination: {
              currentPage: 2,
              mode: "server",
              pageSize: 10,
            },
          });

          expect(data.length).toBe(10);
          expect(data[0].id).toBe("11");
        });
      });
    });

    describe("filters", () => {
      describe("single filter", () => {
        it("should return filtered data", async () => {
          const { data, total } = await dataProvider(client).getList({
            resource: "blog_posts",
            filters: [
              {
                field: "id",
                operator: "eq",
                value: "1",
              },
            ],
            meta: {
              fields: ["id", "title"],
            },
          });

          expect(data[0]["id"]).toBe("1");
          expect(total).toBe(1);
        });
      });

      describe("multiple filters", () => {
        it("should return filtered data", async () => {
          const { data, total } = await dataProvider(client).getList({
            resource: "blog_posts",
            filters: [
              { field: "id", operator: "lt", value: 10 },
              { field: "status", operator: "eq", value: "DRAFT" },
            ],
            meta: {
              fields: ["id", "status"],
            },
          });

          data.forEach((item) => {
            expect(Number(item["id"])).toBeLessThan(10);
            expect(item["status"]).toBe("DRAFT");
          });
        });

        describe("and operator", () => {
          it("should return filtered data", async () => {
            const { data } = await dataProvider(client).getList({
              resource: "blog_posts",
              filters: [
                {
                  operator: "and",
                  value: [
                    {
                      field: "id",
                      operator: "lt",
                      value: 10,
                    },
                    {
                      field: "status",
                      operator: "eq",
                      value: "DRAFT",
                    },
                  ],
                },
              ],
              meta: {
                fields: ["id", "status"],
              },
            });

            expect(data.length).toBe(2);
            expect(data[0]["id"]).toBe("4");
            expect(data[0].status).toBe("DRAFT");
          });
        });
      });
    });

    it("correct sorting response", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blog_posts",
        sorters: [
          {
            field: "id",
            order: "asc",
          },
        ],
        meta: {
          fields: ["id", "title"],
        },
      });

      expect(data[0]["id"]).toBe("1");
      expect(data[0]["title"]).toBe("Corporis unde mollitia laudantium.");
    });

    it("correct filter and sort response", async () => {
      const response = await dataProvider(client).getList({
        resource: "blog_posts",
        filters: [
          {
            field: "category.id",
            operator: "eq",
            value: "8",
          },
        ],
        sorters: [
          {
            field: "title",
            order: "asc",
          },
        ],
        meta: {
          fields: ["id", "title", { category: ["id", "title"] }],
        },
      });

      expect(response.data[0]["id"]).toBe("413");
      expect(response.data[0]["category"].title).toBe("et");
    });
  });
});
