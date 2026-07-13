import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient, getApiUrl } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "custom with %s naming convention",
    (namingConvention) => {
      const apiUrl = getApiUrl(namingConvention);
      const operation =
        namingConvention === "hasura-default"
          ? "posts_aggregate"
          : "postsAggregate";

      it("correct get query response", async () => {
        const response = await dataProvider(createClient(namingConvention), {
          namingConvention,
        }).custom?.({
          url: apiUrl,
          method: "get",
          meta: {
            operation,
            fields: [
              {
                operation: "aggregate",
                fields: ["count"],
                variables: {},
              },
            ],
            variables: {},
          },
        });

        expect(response?.data.aggregate.count).toBe(283);
      });
    },
  );
});

describe("with gql", () => {
  it.each(["gqlQuery", "gqlMutation"] as const)(
    "correct response with hasura-default & %s",
    async (gqlOperation) => {
      const apiUrl = getApiUrl("hasura-default");

      const response = await dataProvider(createClient("hasura-default"), {
        namingConvention: "hasura-default",
      }).custom?.({
        url: apiUrl,
        method: "get",
        meta: {
          [gqlOperation]: gql`
                        query GetPost {
                            posts_aggregate {
                                aggregate {
                                    count
                                }
                            }
                        }
                    `,
        },
      });

      expect(response?.data.posts_aggregate.aggregate.count).toBe(318);
    },
  );

  it.each(["gqlQuery", "gqlMutation"] as const)(
    "correct response with graphql-default & %s",
    async (gqlOperation) => {
      const apiUrl = getApiUrl("graphql-default");

      const response = await dataProvider(createClient("graphql-default"), {
        namingConvention: "graphql-default",
      }).custom?.({
        url: apiUrl,
        method: "get",
        meta: {
          [gqlOperation]: gql`
                        query GetPost {
                            postsAggregate {
                                aggregate {
                                    count
                                }
                            }
                        }
                    `,
        },
      });

      expect(response?.data.postsAggregate.aggregate.count).toBe(318);
    },
  );

  it("correctly passes variables from meta.gqlVariables to the query", async () => {
    const apiUrl = getApiUrl("hasura-default");

    const response = await dataProvider(createClient("hasura-default"), {
      namingConvention: "hasura-default",
    }).custom?.({
      url: apiUrl,
      method: "get",
      meta: {
        gqlQuery: gql`
          query GetPost(
            $includeAvg: Boolean = false
          ) {
            posts_aggregate {
              aggregate {
                count
                avg @include(if: $includeAvg) {
                  id
                }
              }
            }
          }
        `,
        gqlVariables: {
          includeAvg: true,
        },
      },
    });

    expect(response?.data.posts_aggregate.aggregate.count).toBe(318);
    expect(response?.data.posts_aggregate.aggregate.avg.id).toBe(42);
  });

  it("correctly handles the query when gqlVariables aren't provided", async () => {
    const apiUrl = getApiUrl("hasura-default");

    const response = await dataProvider(createClient("hasura-default"), {
      namingConvention: "hasura-default",
    }).custom?.({
      url: apiUrl,
      method: "get",
      meta: {
        gqlQuery: gql`
          query GetPost(
            $includeAvg: Boolean = false
          ) {
            posts_aggregate {
              aggregate {
                count
                avg @include(if: $includeAvg) {
                  id
                }
              }
            }
          }
        `,
      },
    });

    expect(response?.data.posts_aggregate.aggregate.count).toBe(318);
    expect(response?.data.posts_aggregate.aggregate.avg).toBeUndefined();
  });
});
