import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "updateOne with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      let id = "572708c7-840d-430a-befd-1416bdee799a";
      let categoryFieldName = "category_id";

      if (namingConvention === "graphql-default") {
        id = "2a0d531e-ad15-440f-bf0b-7d23e7e21131";
        categoryFieldName = "categoryId";
      }

      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).update({
          resource: "posts",
          id,
          variables: {
            title: "Updated Title",
            content: "Updated Content",
            [categoryFieldName]: "e27156c3-9998-434f-bd5b-2b078283ff26",
          },
          meta: {
            fields: ["id", "title", "content", { category: ["id"] }],
          },
        });

        expect(data["id"]).toEqual(id);
        expect(data["title"]).toEqual("Updated Title");
        expect(data["content"]).toEqual("Updated Content");
        expect(data["category"].id).toEqual(
          "e27156c3-9998-434f-bd5b-2b078283ff26",
        );
      });

      it("correct response without meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).update({
          resource: "posts",
          id,
          variables: {
            title: "E-business alarm",
          },
        });

        expect(data["id"]).toEqual(id);
      });
    },
  );
});

describe("with gql", () => {
  it.each(["gqlQuery", "gqlMutation"] as const)(
    "correct response with hasura-default & %s",
    async (gqlOperation) => {
      const id = "572708c7-840d-430a-befd-1416bdee799a";

      const client = createClient("hasura-default");
      const { data } = await dataProvider(client, {
        namingConvention: "hasura-default",
      }).update({
        resource: "posts",
        id,
        variables: {
          title: "Updated Title",
          content: "Updated Content",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        meta: {
          [gqlOperation]: gql`
                        mutation UpdatePost(
                            $id: uuid!
                            $object: posts_set_input!
                        ) {
                            update_posts_by_pk(
                                pk_columns: { id: $id }
                                _set: $object
                            ) {
                                id
                                title
                                content
                                category_id
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
        },
      });

      expect(data["id"]).toEqual(id);
      expect(data["title"]).toEqual("Updated Title");
      expect(data["content"]).toEqual("Updated Content");
      expect(data["category"].id).toEqual(
        "e27156c3-9998-434f-bd5b-2b078283ff26",
      );
    },
  );

  it.each(["gqlQuery", "gqlMutation"] as const)(
    "correct response with graphql-default & %s",
    async (gqlOperation) => {
      const id = "2a0d531e-ad15-440f-bf0b-7d23e7e21131";

      const client = createClient("graphql-default");
      const { data } = await dataProvider(client, {
        namingConvention: "graphql-default",
      }).update({
        resource: "posts",
        id,
        variables: {
          title: "Updated Title",
          content: "Updated Content",
          categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        meta: {
          [gqlOperation]: gql`
                        mutation UpdatePost(
                            $id: uuid!
                            $object: PostsSetInput!
                        ) {
                            updatePostsByPk(
                                pkColumns: { id: $id }
                                _set: $object
                            ) {
                                id
                                title
                                content
                                categoryId
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
        },
      });

      expect(data["id"]).toEqual(id);
      expect(data["title"]).toEqual("Updated Title");
      expect(data["content"]).toEqual("Updated Content");
      expect(data["category"].id).toEqual(
        "e27156c3-9998-434f-bd5b-2b078283ff26",
      );
    },
  );

  it("correctly passes variables from meta.gqlVariables to the query", async () => {
    const id = "572708c7-840d-430a-befd-1416bdee799a";

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).update({
      resource: "posts",
      id,
      variables: {
        title: "Updated Title",
        content: "Updated Content",
        category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
      meta: {
        gqlMutation: gql`
          mutation UpdatePost(
            $id: uuid!
            $object: posts_set_input!
            $includeCategory: Boolean = false
          ) {
            update_posts_by_pk(
              pk_columns: { id: $id }
              _set: $object
            ) {
              id
              title
              content
              category_id
              category @include(if: $includeCategory) {
                id
                title
              }
            }
          }
        `,
        gqlVariables: {
          includeCategory: true,
        },
      },
    });

    expect(data["id"]).toEqual(id);
    expect(data["title"]).toEqual("Updated Title");
    expect(data["content"]).toEqual("Updated Content");
    expect(data["category"].id).toEqual("e27156c3-9998-434f-bd5b-2b078283ff26");
  });

  it("doesn't pass extra variables to the query without meta.gqlVariables", async () => {
    const id = "572708c7-840d-430a-befd-1416bdee799a";

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).update({
      resource: "posts",
      id,
      variables: {
        title: "Updated Title",
        content: "Updated Content",
        category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
      meta: {
        gqlMutation: gql`
          mutation UpdatePost(
            $id: uuid!
            $object: posts_set_input!
            $includeCategory: Boolean = false
          ) {
            update_posts_by_pk(
              pk_columns: { id: $id }
              _set: $object
            ) {
              id
              title
              content
              category_id
              category @include(if: $includeCategory) {
                id
                title
              }
            }
          }
        `,
      },
    });

    expect(data["id"]).toEqual(id);
    expect(data["title"]).toEqual("Updated Title");
    expect(data["content"]).toEqual("Updated Content");
    expect(data["category"]).toBeUndefined();
  });
});
