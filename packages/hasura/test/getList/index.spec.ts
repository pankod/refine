import gql from "graphql-tag";
import type { DocumentNode } from "graphql";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

// import nock from "nock";
// nock.recorder.rec();

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "getList with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      const categoryFieldName =
        namingConvention === "hasura-default" ? "category_id" : "categoryId";

      it("correct response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["id"]).toBe("4ec22cb3-b679-4891-a489-3d19cf275ab3");
        expect(data[0]["title"]).toBe(
          "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(total).toBe(526);
      });

      it("correct sorting response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
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

        expect(data[0]["id"]).toBe("00c688e2-a1bd-40dd-9f58-1e41d53386d2");
        expect(data[0]["title"]).toBe(
          "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(total).toBe(526);
      });

      it("correct filter response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: categoryFieldName,
              operator: "eq",
              value: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          ],
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["id"]).toBe("48a5591e-4ab0-45f8-950e-aee8a63769df");
        expect(data[0]["title"]).toBe("velit eu est congue elementum in");
        expect(total).toBe(3);
      });

      it("correct nested filter response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: "category.id",
              operator: "eq",
              value: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          ],
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["id"]).toBe("48a5591e-4ab0-45f8-950e-aee8a63769df");
        expect(total).toBe(3);
      });

      it("correct filter and sort response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: categoryFieldName,
              operator: "eq",
              value: "6869be25-7189-40a0-9e3c-12164c1929ec",
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

        expect(data[0]["id"]).toBe("3be19a24-ecee-42d9-949b-5f41623b9b5a");
        expect(data[0]["category"].title).toBe("consequat nulla");
        expect(total).toBe(3);
      });
    },
  );
});

describe("with gqlQuery", () => {
  it("correct filter and sort response with hasura-default", async () => {
    const client = createClient("hasura-default");

    const { data, total } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      filters: [
        {
          field: "category_id",
          operator: "eq",
          value: "6869be25-7189-40a0-9e3c-12164c1929ec",
        },
      ],
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
      meta: {
        gqlQuery: gql`
                    query GetPosts(
                        $offset: Int!
                        $limit: Int!
                        $order_by: [posts_order_by!]
                        $where: posts_bool_exp
                    ) {
                        posts(
                            offset: $offset
                            limit: $limit
                            order_by: $order_by
                            where: $where
                        ) {
                            id
                            title
                            category_id
                            created_at
                            category {
                                id
                                title
                            }
                        }
                        posts_aggregate(where: $where) {
                            aggregate {
                                count
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0]["id"]).toBe("3be19a24-ecee-42d9-949b-5f41623b9b5a");
    expect(data[0]["category"].title).toBe("consequat nulla");
    expect(total).toBe(3);
  });

  it("correct filter and sort response with graphql-default", async () => {
    const client = createClient("graphql-default");

    const { data, total } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).getList({
      resource: "posts",
      filters: [
        {
          field: "categoryId",
          operator: "eq",
          value: "6869be25-7189-40a0-9e3c-12164c1929ec",
        },
      ],
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
      meta: {
        gqlQuery: gql`
                    query GetPosts(
                        $offset: Int!
                        $limit: Int!
                        $orderBy: [PostsOrderBy!]
                        $where: PostsBoolExp
                    ) {
                        posts(
                            offset: $offset
                            limit: $limit
                            orderBy: $orderBy
                            where: $where
                        ) {
                            id
                            title
                            categoryId
                            createdAt
                            category {
                                id
                                title
                            }
                        }
                        postsAggregate(where: $where) {
                            aggregate {
                                count
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0]["id"]).toBe("3be19a24-ecee-42d9-949b-5f41623b9b5a");
    expect(data[0]["category"].title).toBe("consequat nulla");
    expect(total).toBe(3);
  });
});

describe("with gqlVariables", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {
      return;
    });
  });
  const gqlQuery = gql`
    query GetPosts(
        $offset: Int!
        $limit: Int!
        $order_by: [posts_order_by!]
        $where: posts_bool_exp
    ) {
        posts(
            offset: $offset
            limit: $limit
            order_by: $order_by
            where: $where
        ) {
            id
            title
            category_id
            created_at
            category {
                id
                title
            }
        }
        posts_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
  `;
  it("with one column filter and 2 '_or' filters", async () => {
    const client = createClient("hasura-default");

    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      meta: {
        gqlQuery,
        gqlVariables: {
          where: {
            content: { _ilike: "updated%" },
            _or: [
              {
                title: { _ilike: "Etiam tincidunt ex ut auctor faucibus" },
              },
              {
                title: { _ilike: "%Updated%" },
              },
            ],
          },
        },
      },
    });

    expect(data.length).toBe(8);
    expect(data[0].id).toBe("6379bbda-0857-40f2-a277-b401ea6134d7");
    expect(data[7].id).toBe("2a0d531e-ad15-440f-bf0b-7d23e7e21131");
  });
  it("with 2 arbitrary column filters and '_or' filter", async () => {
    const client = createClient("hasura-default");

    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      meta: {
        gqlQuery,
        gqlVariables: {
          where: {
            content: { _ilike: "updated%" },
            category: { title: { _eq: "aaaaaaaaaarhoncus" } },
            _or: [
              {
                title: { _ilike: "Etiam tincidunt ex ut auctor faucibus" },
              },
              {
                title: { _ilike: "%Updated%" },
              },
            ],
          },
        },
      },
    });

    expect(data.length).toBe(2);
    expect(data[0].id).toBe("6379bbda-0857-40f2-a277-b401ea6134d7");
    expect(data[1].id).toBe("c7ba5e30-8c5f-46bb-862d-e2bcf6487749");
  });
  it("with 2 arbitrary column filters", async () => {
    const client = createClient("hasura-default");

    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      meta: {
        gqlQuery,
        gqlVariables: {
          where: {
            content: { _ilike: "updated%" },
            category: { title: { _eq: "aaaaaaaaaarhoncus" } },
          },
        },
      },
    });

    expect(data.length).toBe(3);
    expect(data[0].id).toBe("6379bbda-0857-40f2-a277-b401ea6134d7");
    expect(data[1].id).toBe("c7ba5e30-8c5f-46bb-862d-e2bcf6487749");
    expect(data[2].id).toBe("9cd924d2-de3b-479a-9882-23feeb0fd80f");
  });
  it("with one column filter and '_and' filter", async () => {
    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      meta: {
        gqlQuery,
        gqlVariables: {
          where: {
            category: { title: { _eq: "aaaaaaaaaarhoncus" } },
            _and: [
              {
                created_at: {
                  _gte: "2023-06-07T06:13:57.996223+00:00",
                },
              },
              {
                title: { _ilike: "%test%" },
              },
            ],
          },
        },
      },
    });

    expect(data.length).toBe(1);
    expect(data[0].id).toBe("fcaa6d74-ef59-41af-954b-50defdb78d30");
  });
  it("with 2 arbitrary column filters and multiple '_and' filters", async () => {
    const client = createClient("hasura-default");

    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      meta: {
        gqlQuery,
        gqlVariables: {
          where: {
            created_at: { _gte: "2023-06-07T06:13:57.996223+00:00" },
            content: { _eq: "Updated Content" },
            _and: [
              {
                category: { title: { _eq: "aaaaaaaaaarhoncus" } },
              },
              {
                title: { _ilike: "%updated%" },
              },
            ],
          },
        },
      },
    });

    expect(data.length).toBe(2);
    expect(data[0].id).toBe("6379bbda-0857-40f2-a277-b401ea6134d7");
    expect(data[1].id).toBe("c7ba5e30-8c5f-46bb-862d-e2bcf6487749");
  });

  it("with 2 column filters and '_or' filter and '_and' filter", async () => {
    const client = createClient("hasura-default");

    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      meta: {
        gqlQuery,
        gqlVariables: {
          where: {
            created_at: {
              _gte: "2023-08-04T08:26:26.489116+00:00",
            },
            category: {
              title: { _eq: "turpis adipiscing lorem 123" },
            },
            _and: [
              {
                title: {
                  _ilike: "%Updated%",
                },
              },
              {
                title: {
                  _ilike: "%3%",
                },
              },
            ],
            _or: [
              {
                content: {
                  _eq: "CREATED content23",
                },
              },
              {
                content: {
                  _eq: "CREATED content1",
                },
              },
            ],
          },
        },
      },
    });

    expect(data.length).toBe(1);
    expect(data[0].id).toBe("1f85588c-7fc2-4223-b955-42909a7df4a8");
  });

  it("with filter by title, with '_and' -> '_not' nested filters", async () => {
    const client = createClient("hasura-default");

    const { data, total } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      filters: [
        {
          field: "title",
          operator: "contains",
          value: "3",
        },
      ],
      meta: {
        gqlQuery,
        gqlVariables: {
          where: {
            _and: [
              {
                _not: {
                  category_id: {
                    _eq: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
                  },
                },
              },
              {
                created_at: {
                  _gte: "2023-08-04T08:26:26.489116+00:00",
                },
              },
            ],
          },
        },
      },
    });

    expect(data[0]["id"]).toBe("7f690a87-db33-4a8f-b02d-e6d4a7241a9b");
    expect(data[0]["category"].title).toBe("HK");
    expect(total).toBe(5);

    expect(data[0]["title"]).toBe("123");
  });

  describe.each(["hasura-default", "graphql-default"] as const)(
    "getList with %s naming convention",
    (namingConvention) => {
      let gqlQuery: DocumentNode;
      if (namingConvention === "hasura-default") {
        gqlQuery = gql`
          query GetPosts(
              $offset: Int!
              $limit: Int!
              $order_by: [posts_order_by!]
              $where: posts_bool_exp
          ) {
              posts(
                  offset: $offset
                  limit: $limit
                  order_by: $order_by
                  where: $where
              ) {
                  id
                  title
                  category_id
                  created_at
                  category {
                      id
                      title
                  }
              }
              posts_aggregate(where: $where) {
                  aggregate {
                      count
                  }
              }
          }
        `;
      } else {
        gqlQuery = gql`
          query GetPosts(
              $offset: Int!
              $limit: Int!
              $orderBy: [PostsOrderBy!]
              $where: PostsBoolExp
          ) {
              posts(
                  offset: $offset
                  limit: $limit
                  orderBy: $orderBy
                  where: $where
              ) {
                  id
                  title
                  categoryId
                  createdAt
                  category {
                      id
                      title
                  }
              }
              postsAggregate(where: $where) {
                  aggregate {
                      count
                  }
              }
          }
        `;
      }
      const categoryIdkey =
        namingConvention === "hasura-default" ? "category_id" : "categoryId";
      const createdAtKey =
        namingConvention === "hasura-default" ? "created_at" : "createdAt";

      it("with filter by title, sort by title asc, with '_and' & '_or' filters", async () => {
        const client = createClient(namingConvention);

        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: "title",
              operator: "contains",
              value: "3",
            },
          ],
          sorters: [
            {
              field: "title",
              order: "asc",
            },
          ],
          meta: {
            gqlQuery,
            gqlVariables: {
              where: {
                _and: [
                  {
                    title: {
                      _ilike: "%Updated%",
                    },
                  },
                  {
                    [createdAtKey]: {
                      _gte: "2023-08-04T08:26:26.489116+00:00",
                    },
                  },
                ],
                _or: [
                  {
                    content: {
                      _eq: "CREATED content23",
                    },
                  },
                  {
                    content: {
                      _eq: "CREATED content1",
                    },
                  },
                ],
              },
            },
          },
        });

        expect(data[0]["id"]).toBe("0ad3a15a-3191-4f44-910f-bd210deaa589");
        expect(data[0]["category"].title).toBe("ok");
        expect(total).toBe(2);

        expect(data[0]["title"]).toBe("updated title12345");
        expect(data[1]["title"]).toBe("updated title3");
      });
      it("with filter by title, sort by title asc, with '_not' & '_and' & '_or'", async () => {
        const client = createClient(namingConvention);

        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: "title",
              operator: "contains",
              value: "3",
            },
          ],
          sorters: [
            {
              field: "title",
              order: "asc",
            },
          ],
          meta: {
            gqlQuery,
            gqlVariables: {
              where: {
                _not: {
                  category: { title: { _eq: "ok" } },
                },
                _and: [
                  {
                    title: {
                      _ilike: "%Updated%",
                    },
                  },
                  {
                    [createdAtKey]: {
                      _gte: "2023-08-04T08:26:26.489116+00:00",
                    },
                  },
                ],
                _or: [
                  {
                    content: {
                      _eq: "CREATED content23",
                    },
                  },
                  {
                    content: {
                      _eq: "CREATED content1",
                    },
                  },
                ],
              },
            },
          },
        });

        expect(data[0]["id"]).toBe("1f85588c-7fc2-4223-b955-42909a7df4a8");
        expect(data[0]["category"].title).toBe("turpis adipiscing lorem 123");
        expect(total).toBe(1);

        expect(data[0]["title"]).toBe("updated title3");
      });
      it("without provided CRUD filters, with sort by title asc, '_and' & '_or' filters", async () => {
        const client = createClient(namingConvention);

        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          sorters: [
            {
              field: "title",
              order: "asc",
            },
          ],
          meta: {
            gqlQuery,
            gqlVariables: {
              where: {
                _and: [
                  {
                    _not: {
                      category: { title: { _eq: "ok" } },
                    },
                  },
                  {
                    title: {
                      _ilike: "%Updated%",
                    },
                  },
                  {
                    title: {
                      _ilike: "%3%",
                    },
                  },
                  {
                    [createdAtKey]: {
                      _gte: "2023-08-04T08:26:26.489116+00:00",
                    },
                  },
                ],
                _or: [
                  {
                    content: {
                      _eq: "CREATED content23",
                    },
                  },
                  {
                    content: {
                      _eq: "CREATED content1",
                    },
                  },
                ],
              },
            },
          },
        });

        expect(data[0]["id"]).toBe("1f85588c-7fc2-4223-b955-42909a7df4a8");
        expect(data[0]["category"].title).toBe("turpis adipiscing lorem 123");
        expect(total).toBe(1);

        expect(data[0]["title"]).toBe("updated title3");
      });

      it("with filter by title, sort by id DESC, with '_and' & '_or'", async () => {
        const client = createClient(namingConvention);

        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: "title",
              operator: "contains",
              value: "3",
            },
          ],
          sorters: [
            {
              field: "id",
              order: "desc",
            },
          ],
          meta: {
            gqlQuery,
            gqlVariables: {
              where: {
                _and: [
                  {
                    title: {
                      _ilike: "%Updated%",
                    },
                  },
                  {
                    [createdAtKey]: {
                      _gte: "2023-08-04T08:26:26.489116+00:00",
                    },
                  },
                ],
                _or: [
                  {
                    content: {
                      _eq: "CREATED content23",
                    },
                  },
                  {
                    content: {
                      _eq: "CREATED content1",
                    },
                  },
                ],
              },
            },
          },
        });

        expect(data[0]["id"]).toBe("1f85588c-7fc2-4223-b955-42909a7df4a8");
        expect(data[0]["category"].title).toBe("turpis adipiscing lorem 123");
        expect(total).toBe(2);

        expect(data[0]["title"]).toBe("updated title3");
        expect(data[1]["title"]).toBe("updated title12345");
      });
      it("with sort by id, with '_and' -> multiple '_not' filters.", async () => {
        const client = createClient(namingConvention);

        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          sorters: [
            {
              field: "id",
              order: "asc",
            },
          ],
          filters: [
            {
              field: "title",
              operator: "contains",
              value: "3",
            },
          ],
          meta: {
            gqlQuery,
            gqlVariables: {
              where: {
                _and: [
                  {
                    _not: {
                      category: { title: { _eq: "ok" } },
                    },
                  },
                  {
                    _not: {
                      [categoryIdkey]: {
                        _eq: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
                      },
                    },
                  },
                  {
                    [createdAtKey]: {
                      _gte: "2023-08-04T08:26:26.489116+00:00",
                    },
                  },
                ],
              },
            },
          },
        });

        expect(data[0]["id"]).toBe("7af17f71-1ddf-4969-bcec-565f05b16098");
        expect(data[0]["category"].title).toBe("lorem1 integer tincidunty");
        expect(total).toBe(4);

        expect(data[0]["title"]).toBe("updated title3");
      });
    },
  );
});
