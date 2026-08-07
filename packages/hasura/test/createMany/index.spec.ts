import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "createMany with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      const categoryFieldName =
        namingConvention === "hasura-default" ? "category_id" : "categoryId";

      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).createMany!({
          resource: "posts",
          variables: [
            {
              content: "Vestibulum vulputate sapien arcu.",
              title: "Aenean ultricies non libero sit amet pellentesque",
              [categoryFieldName]: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
            {
              content: "Aliquam nibh erat.",
              title: "Etiam tincidunt ex ut auctor faucibus",
              [categoryFieldName]: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          ],
          meta: {
            fields: ["id", "title", "content", { category: ["id"] }],
          },
        });

        expect(data[0]["title"]).toEqual(
          "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
        expect(data[0]["category"].id).toEqual(
          "e27156c3-9998-434f-bd5b-2b078283ff26",
        );

        expect(data[1]["title"]).toEqual(
          "Etiam tincidunt ex ut auctor faucibus",
        );
        expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
        expect(data[1]["category"].id).toEqual(
          "e27156c3-9998-434f-bd5b-2b078283ff26",
        );
      });

      it("correct response without meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).createMany!({
          resource: "posts",
          variables: [
            {
              content: "Vestibulum vulputate sapien arcu.",
              title: "Aenean ultricies non libero sit amet pellentesque",
              [categoryFieldName]: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
            {
              content: "Aliquam nibh erat.",
              title: "Etiam tincidunt ex ut auctor faucibus",
              [categoryFieldName]: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          ],
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["title"]).toEqual(
          "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data[1]["title"]).toEqual(
          "Etiam tincidunt ex ut auctor faucibus",
        );
      });
    },
  );
});

describe("with gqlMutation", () => {
  it("correct response with hasura-default", async () => {
    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).createMany!({
      resource: "posts",
      variables: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
      meta: {
        gqlMutation: gql`
                    mutation CreateManyPosts($objects: [posts_insert_input!]!) {
                        insert_posts(objects: $objects) {
                            returning {
                                id
                                title
                                content
                                category {
                                    id
                                }
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0]["title"]).toEqual(
      "Aenean ultricies non libero sit amet pellentesque",
    );
    expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
    expect(data[0]["category"].id).toEqual(
      "e27156c3-9998-434f-bd5b-2b078283ff26",
    );

    expect(data[1]["title"]).toEqual("Etiam tincidunt ex ut auctor faucibus");
    expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
    expect(data[1]["category"].id).toEqual(
      "e27156c3-9998-434f-bd5b-2b078283ff26",
    );
  });

  it("correct response with graphql-default", async () => {
    const client = createClient("graphql-default");
    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).createMany!({
      resource: "posts",
      variables: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
        },
      ],
      meta: {
        gqlMutation: gql`
                    mutation CreateManyPosts($objects: [PostsInsertInput!]!) {
                        insertPosts(objects: $objects) {
                            returning {
                                id
                                title
                                content
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0]["title"]).toEqual(
      "Aenean ultricies non libero sit amet pellentesque",
    );

    expect(data[1]["title"]).toEqual("Etiam tincidunt ex ut auctor faucibus");
  });

  it("correctly passes variables from meta.gqlVariables to the query", async () => {
    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).createMany!({
      resource: "posts",
      variables: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
      meta: {
        gqlMutation: gql`
          mutation CreateManyPosts(
            $objects: [posts_insert_input!]!,
            $includeCategory: Boolean = false
          ) {
            insert_posts(objects: $objects) {
              returning {
                id
                title
                content
                category @include(if: $includeCategory) {
                  id
                }
              }
            }
          }
        `,
        gqlVariables: {
          includeCategory: true,
        },
      },
    });

    expect(data[0]["title"]).toEqual(
      "Aenean ultricies non libero sit amet pellentesque",
    );
    expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
    expect(data[0]["category"].id).toEqual(
      "e27156c3-9998-434f-bd5b-2b078283ff26",
    );

    expect(data[1]["title"]).toEqual("Etiam tincidunt ex ut auctor faucibus");
    expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
    expect(data[1]["category"].id).toEqual(
      "e27156c3-9998-434f-bd5b-2b078283ff26",
    );
  });

  it("doesn't pass extra variables to the query without meta.gqlVariables", async () => {
    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).createMany!({
      resource: "posts",
      variables: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
      meta: {
        gqlMutation: gql`
          mutation CreateManyPosts(
            $objects: [posts_insert_input!]!,
            $includeCategory: Boolean = false
          ) {
            insert_posts(objects: $objects) {
              returning {
                id
                title
                content
                category @include(if: $includeCategory) {
                  id
                }
              }
            }
          }
        `,
      },
    });

    expect(data[0]["title"]).toEqual(
      "Aenean ultricies non libero sit amet pellentesque",
    );
    expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
    expect(data[0]["category"]).toBeUndefined();

    expect(data[1]["title"]).toEqual("Etiam tincidunt ex ut auctor faucibus");
    expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
    expect(data[1]["category"]).toBeUndefined();
  });
});
