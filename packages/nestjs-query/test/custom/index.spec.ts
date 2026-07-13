import type { BaseRecord } from "@refinedev/core";

import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";
import gql from "graphql-tag";

describe("custom", () => {
  describe("gql", () => {
    it("correct get query response using GET request", async () => {
      const response = await dataProvider(client).custom?.({
        url: "",
        method: "get",
        meta: {
          gqlQuery: gql`
                        query BlogPostAggregate {
                            blogPostAggregate {
                                groupBy {
                                    status
                                }
                                count {
                                    status
                                }
                            }
                        }
                    `,
          operation: "blogPostAggregate",
          fields: [{ groupBy: ["status"], count: ["status"] }],
        },
      });

      expect(response?.data?.["blogPostAggregate"]).toHaveLength(3);
      expect(response.data?.["blogPostAggregate"][0].groupBy.status).toBe(
        "DRAFT",
      );
      expect(
        response.data?.["blogPostAggregate"][0].count.status,
      ).toBeDefined();
      expect(response.data?.["blogPostAggregate"][1].groupBy.status).toBe(
        "PUBLISHED",
      );
      expect(
        response.data?.["blogPostAggregate"][1].count.status,
      ).toBeDefined();
      expect(response.data?.["blogPostAggregate"][2].groupBy.status).toBe(
        "REJECTED",
      );
      expect(
        response.data?.["blogPostAggregate"][2].count.status,
      ).toBeDefined();
    });

    it("custom graphql query using GET request", async () => {
      const response = await dataProvider(client).custom<BaseRecord>({
        url: "",
        method: "get",
        meta: {
          gqlQuery: gql`
                        query GetAllBlogPosts(
                            $sorting: [BlogPostSort!]
                            $filter: BlogPostFilter!
                            $paging: OffsetPaging!
                        ) {
                            sorted: blogPosts(
                                sorting: $sorting
                                paging: $paging
                            ) {
                                nodes {
                                    id
                                    title
                                    createdAt
                                }
                            }
                            filtered: blogPosts(filter: $filter) {
                                nodes {
                                    id
                                }
                            }
                        }
                    `,
          variables: {
            sorting: [{ field: "id", direction: "ASC" }],
            filter: { id: { eq: 1 } },
            paging: { limit: 2, offset: 0 },
          },
        },
      });

      expect(response.data.sorted).toBeDefined();
      expect(response.data.filtered).toBeDefined();
      expect(+response.data.sorted.nodes[1].id).toBeGreaterThan(
        +response.data.sorted.nodes[0].id,
      );
      expect(response.data.filtered.nodes).toHaveLength(1);
    });

    it("correct get mutation response using POST request", async () => {
      const response = await dataProvider(client).custom?.({
        url: "",
        method: "post",
        meta: {
          gqlMutation: gql`
                        mutation UpdateManyBlogPosts(
                            $input: UpdateManyBlogPostsInput!
                        ) {
                            updateManyBlogPosts(input: $input) {
                                updatedCount
                            }
                        }
                    `,
          variables: {
            input: {
              value: {
                filter: {
                  id: { in: ["42"] },
                },
                update: {
                  status: "REJECTED",
                },
              },
              type: "UpdateManyBlogPostsInput",
              required: true,
            },
          },
          fields: ["updatedCount"],
        },
      });

      expect(response?.data?.["updateManyBlogPosts"].updatedCount).toBe(1);
    });

    it("correct get query response using GET request and custom URL", async () => {
      const response = await dataProvider(client).custom?.({
        url: "http://localhost:3004/graphql",
        method: "get",
        meta: {
          gqlQuery: gql`
                        query BlogPostAggregate {
                            blogPostAggregate {
                                groupBy {
                                    status
                                }
                                count {
                                    status
                                }
                            }
                        }
                    `,
          operation: "blogPostAggregate",
          fields: [{ groupBy: ["status"], count: ["status"] }],
        },
      });

      expect(response?.data?.["blogPostAggregate"]).toHaveLength(3);
      expect(response.data?.["blogPostAggregate"][0].groupBy.status).toBe(
        "DRAFT",
      );
      expect(
        response.data?.["blogPostAggregate"][0].count.status,
      ).toBeDefined();
      expect(response.data?.["blogPostAggregate"][1].groupBy.status).toBe(
        "PUBLISHED",
      );
      expect(
        response.data?.["blogPostAggregate"][1].count.status,
      ).toBeDefined();
      expect(response.data?.["blogPostAggregate"][2].groupBy.status).toBe(
        "REJECTED",
      );
      expect(
        response.data?.["blogPostAggregate"][2].count.status,
      ).toBeDefined();
    });

    it("correctly passes custom URL and custom headers without overriding existing headers using GET", async () => {
      client.setHeader("Custom-Header-Before", "Custom-Header-Before");

      const response = await dataProvider(client).custom?.({
        url: "http://localhost:3004/graphql",
        method: "get",
        headers: {
          "Custom-Header": "Custom-Header-Value",
        },
        meta: {
          gqlQuery: gql`
                        query TestQuery {
                            testAggregate {
                                id
                            }
                        }
                    `,
          operation: "testAggregate",
        },
      });

      expect(response?.data?.testAggregate.id).toBe("lorem ipsum");
    });

    it("doesnt change URL of subsequent requests", async () => {
      client.setHeader("Subsequent-Test", "Subsequent-Test");

      const response = await dataProvider(client).custom?.({
        url: "http://localhost:3004/graphql",
        method: "get",
        meta: {
          gqlQuery: gql`
                        query TestQuery {
                            testAggregate {
                                id
                            }
                        }
                    `,
          operation: "testAggregate",
        },
      });

      expect(response?.data?.testAggregate.id).toBe("lorem ipsum");

      const nextResponse = await dataProvider(client).getOne({
        resource: "blog_posts",
        id: "1",
        meta: {
          gqlQuery: gql`
                        query GetOneBlogPost($id: ID!) {
                            blogPost(id: $id) {
                                id
                                title
                                content
                                status
                                category {
                                    id
                                }
                            }
                        }
                    `,
        },
      });

      expect(nextResponse.data?.id).toBe("1");
    });

    it("unsupported method throws error", async () => {
      const unsupportedMethods = ["delete", "head", "options", "put", "patch"];
      unsupportedMethods.sort(() => Math.random() - 0.5);
      const method = unsupportedMethods[0] as any;

      try {
        await dataProvider(client).custom?.({
          url: "",
          method,
          meta: {
            operation: "updateManyBlogPosts",
            variables: {
              input: {
                value: {
                  filter: {
                    id: { in: ["42"] },
                  },
                  update: {
                    status: "REJECTED",
                  },
                },
                type: "UpdateManyBlogPostsInput",
                required: true,
              },
            },
            fields: ["updatedCount"],
          },
        });
      } catch (e) {
        expect((e as Error).message).toBe(
          `GraphQL does not support ${method} method.`,
        );
      }
    });
  });

  describe("fields (legacy)", () => {
    it("correct get query response using GET request", async () => {
      const response = await dataProvider(client).custom?.({
        url: "",
        method: "get",
        meta: {
          operation: "blogPostAggregate",
          fields: [{ groupBy: ["status"], count: ["status"] }],
        },
      });

      expect(response?.data).toHaveLength(3);
      expect(response.data[0].groupBy.status).toBe("DRAFT");
      expect(response.data[0].count.status).toBeDefined();
      expect(response.data[1].groupBy.status).toBe("PUBLISHED");
      expect(response.data[1].count.status).toBeDefined();
      expect(response.data[2].groupBy.status).toBe("REJECTED");
      expect(response.data[2].count.status).toBeDefined();
    });

    it("custom graphql query using GET request", async () => {
      const response = await dataProvider(client).custom<BaseRecord>({
        url: "",
        method: "get",
        meta: {
          rawQuery: `
                    query GetAllBlogPosts(
                        $sorting: [BlogPostSort!]
                        $filter: BlogPostFilter!
                        $paging: OffsetPaging!
                      ) {
                        sorted: blogPosts(sorting: $sorting, paging: $paging) {
                          nodes {
                            id
                            title
                            createdAt
                          }
                        }
                        filtered: blogPosts(filter: $filter) {
                          nodes {
                            id
                          }
                        }
                      }
                `,
          variables: {
            sorting: [{ field: "id", direction: "ASC" }],
            filter: { id: { eq: 1 } },
            paging: { limit: 2, offset: 0 },
          },
        },
      });

      expect(response.data.sorted).toBeDefined();
      expect(response.data.filtered).toBeDefined();
      expect(+response.data.sorted.nodes[1].id).toBeGreaterThan(
        +response.data.sorted.nodes[0].id,
      );
      expect(response.data.filtered.nodes).toHaveLength(1);
    });

    it("correct get mutation response using POST request", async () => {
      const response = await dataProvider(client).custom?.({
        url: "",
        method: "post",
        meta: {
          operation: "updateManyBlogPosts",
          variables: {
            input: {
              value: {
                filter: {
                  id: { in: ["42"] },
                },
                update: {
                  status: "REJECTED",
                },
              },
              type: "UpdateManyBlogPostsInput",
              required: true,
            },
          },
          fields: ["updatedCount"],
        },
      });

      expect(response?.data.updatedCount).toBe(1);
    });

    it("throws error when no operation name is provided", async () => {
      try {
        await dataProvider(client).custom?.({
          url: "",
          method: "post",
          meta: {
            variables: {
              input: {
                value: {
                  filter: {
                    id: { in: ["42"] },
                  },
                  update: {
                    status: "REJECTED",
                  },
                },
                type: "UpdateManyBlogPostsInput",
                required: true,
              },
            },
            fields: ["updatedCount"],
          },
        });
      } catch (e) {
        expect((e as Error).message).toEqual(
          "GraphQL operation name required.",
        );
      }
    });

    it("throws error when no meta is provided", async () => {
      try {
        await dataProvider(client).custom?.({
          url: "",
          method: "post",
        });
      } catch (e) {
        expect((e as Error).message).toEqual(
          "GraphQL needs operation, fields and variables values in meta object.",
        );
      }
    });
  });
});
