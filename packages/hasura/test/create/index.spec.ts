import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "create with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      const categoryFieldName =
        namingConvention === "hasura-default" ? "category_id" : "categoryId";

      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).create({
          resource: "posts",
          variables: {
            content: "Lorem ipsum dolor sit amet.",
            title: "Lorem ipsum dolore",
            [categoryFieldName]: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
          },
          meta: {
            fields: ["id", "title", "content", { category: ["id"] }],
          },
        });

        expect(data["title"]).toEqual("Lorem ipsum dolore");
        expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
        expect(data["category"].id).toEqual(
          "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
        );
      });
    },
  );
});

describe("with gql", () => {
  it.each(["gqlQuery", "gqlMutation"] as const)(
    "correct response with hasura-default & %s",
    async (gqlOperation) => {
      const client = createClient("hasura-default");
      const { data } = await dataProvider(client).create({
        resource: "posts",
        variables: {
          content: "Lorem ipsum dolor sit amet.",
          title: "Lorem ipsum dolore",
          category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
        },
        meta: {
          [gqlOperation]: gql`
                        mutation CreatePost($object: posts_insert_input!) {
                            insert_posts_one(object: $object) {
                                id
                                title
                                content
                                category {
                                    id
                                }
                            }
                        }
                    `,
        },
      });

      expect(data["title"]).toEqual("Lorem ipsum dolore");
      expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
      expect(data["category"]["id"]).toEqual(
        "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      );
    },
  );

  it.each(["gqlQuery", "gqlMutation"] as const)(
    "correct response with graphql-default & %s",
    async (gqlOperation) => {
      const client = createClient("graphql-default");
      const { data } = await dataProvider(client, {
        namingConvention: "graphql-default",
      }).create({
        resource: "posts",
        variables: {
          content: "Lorem ipsum dolor sit amet.",
          title: "Lorem ipsum dolore",
          categoryId: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
        },
        meta: {
          [gqlOperation]: gql`
                        mutation CreatePost($object: PostsInsertInput!) {
                            insertPostsOne(object: $object) {
                                id
                                title
                                content
                                category {
                                    id
                                }
                            }
                        }
                    `,
        },
      });

      expect(data["title"]).toEqual("Lorem ipsum dolore");
      expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
      expect(data["category"]["id"]).toEqual(
        "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      );
    },
  );

  it("correctly passes variables from meta.gqlVariables to the query", async () => {
    const client = createClient("hasura-default");
    const { data } = await dataProvider(client).create({
      resource: "posts",
      variables: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
      meta: {
        gqlMutation: gql`
          mutation CreatePost(
            $object: posts_insert_input!,
            $includeCategory: Boolean = false
          ) {
            insert_posts_one(object: $object) {
              id
              title
              content
              category @include(if: $includeCategory) {
                id
              }
            }
          }
        `,
        gqlVariables: {
          includeCategory: true,
        },
      },
    });

    expect(data["title"]).toEqual("Lorem ipsum dolore");
    expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
    expect(data["category"]["id"]).toEqual(
      "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
    );
  });

  it("doesn't pass extra variables to the query without meta.gqlVariables", async () => {
    const client = createClient("hasura-default");
    const { data } = await dataProvider(client).create({
      resource: "posts",
      variables: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
      meta: {
        gqlMutation: gql`
          mutation CreatePost(
            $object: posts_insert_input!,
            $includeCategory: Boolean = false
          ) {
            insert_posts_one(object: $object) {
              id
              title
              content
              category @include(if: $includeCategory) {
                id
              }
            }
          }
        `,
      },
    });

    expect(data["title"]).toEqual("Lorem ipsum dolore");
    expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
    expect(data["category"]).toBeUndefined();
  });
});
