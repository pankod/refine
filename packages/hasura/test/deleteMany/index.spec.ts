import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "deleteMany with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      let withMetaIds = [
        "7b173e43-1a37-4099-a98c-efc4bdc256d9",
        "9786b4bd-9762-4039-90da-8d572e8c013b",
      ];
      let withoutMetaIds = [
        "74637d48-acb3-4345-96d3-b0b5d7803287",
        "376e9618-6631-4ae0-9026-bcf85f8c1a6a",
      ];

      if (namingConvention === "graphql-default") {
        withMetaIds = [
          "7d026623-a2fe-4559-8368-b81debbdcc87",
          "74c8e223-69e5-4226-8355-387e82256110",
        ];
        withoutMetaIds = [
          "a3be942e-cd37-4b26-9306-4b5d2c790fe2",
          "b03a2456-ce22-4580-8539-45f07567db7c",
        ];
      }

      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).deleteMany!({
          resource: "posts",
          ids: withMetaIds,
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0].id).toEqual(withMetaIds[0]);
        expect(data[1].id).toEqual(withMetaIds[1]);
      });

      it("correct response without meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).deleteMany!({
          resource: "posts",
          ids: withoutMetaIds,
        });

        expect(data[0].id).toEqual(withoutMetaIds[0]);
        expect(data[1].id).toEqual(withoutMetaIds[1]);
      });
    },
  );
});

describe("with gqlMutation", () => {
  it("correct response with hasura-default", async () => {
    const ids = [
      "a6da5ec4-3900-4da0-ac13-bafeef14e083",
      "f8b4855a-f372-4551-b9fd-e3d30fd98f49",
    ];

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).deleteMany!({
      resource: "posts",
      ids,
      meta: {
        gqlMutation: gql`
                    mutation DeleteManyPosts($where: posts_bool_exp!) {
                        delete_posts(where: $where) {
                            returning {
                                id
                                title
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0].id).toEqual(ids[0]);
    expect(data[1].id).toEqual(ids[1]);
  });

  it("correct response with meta graphql-default", async () => {
    const ids = [
      "926812ce-7f70-487a-8026-51c8404456f7",
      "5c48097a-ba80-45cf-afe9-b59d279277d0",
    ];

    const client = createClient("graphql-default");
    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).deleteMany!({
      resource: "posts",
      ids,
      meta: {
        gqlMutation: gql`
                    mutation DeleteManyPosts($where: PostsBoolExp!) {
                        deletePosts(where: $where) {
                            returning {
                                id
                                title
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0].id).toEqual(ids[0]);
    expect(data[1].id).toEqual(ids[1]);
  });

  it("correct response without gql hasura-default", async () => {
    const ids = [
      "a6da5ec4-3900-4da0-ac13-bafeef14e083",
      "f8b4855a-f372-4551-b9fd-e3d30fd98f49",
    ];

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).deleteMany!({
      resource: "posts",
      ids,
    });

    expect(data[0].id).toEqual(ids[0]);
    expect(data[1].id).toEqual(ids[1]);
  });

  it("correct response without gql graphql-default", async () => {
    const ids = [
      "926812ce-7f70-487a-8026-51c8404456f7",
      "5c48097a-ba80-45cf-afe9-b59d279277d0",
    ];

    const client = createClient("graphql-default");
    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).deleteMany!({
      resource: "posts",
      ids,
    });

    expect(data[0].id).toEqual(ids[0]);
    expect(data[1].id).toEqual(ids[1]);
  });

  it("correctly passes variables from meta.gqlVariables to the query", async () => {
    const ids = [
      "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e0f",
      "f0e1d2c3-b4a5-6789-8f7e-6d5c4b3a2f1e",
    ];

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).deleteMany!({
      resource: "posts",
      ids,
      meta: {
        gqlMutation: gql`
          mutation DeleteManyPosts(
            $where: posts_bool_exp!,
            $includeTitle: Boolean = false
          ) {
            delete_posts(where: $where) {
              returning {
                id
                title @include(if: $includeTitle)
              }
            }
          }
        `,
        gqlVariables: {
          includeTitle: true,
        },
      },
    });

    expect(data[0].id).toEqual(ids[0]);
    expect(data[0].title).toEqual(
      "Aenean ultricies non libero sit amet pellentesque",
    );
    expect(data[1].id).toEqual(ids[1]);
    expect(data[1].title).toEqual("Etiam tincidunt ex ut auctor faucibus");
  });

  it("doesn't pass extra variables to the query without meta.gqlVariables", async () => {
    const ids = [
      "d3c2b1a0-f9e8-7d6c-5b4a-3f2e1d0c9b8a",
      "a9b8c7d6-e5f4-3210-2f1e-0d9c8b7a6f5e",
    ];

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).deleteMany!({
      resource: "posts",
      ids,
      meta: {
        gqlMutation: gql`
          mutation DeleteManyPosts(
            $where: posts_bool_exp!,
            $includeTitle: Boolean = false
          ) {
            delete_posts(where: $where) {
              returning {
                id
                title @include(if: $includeTitle)
              }
            }
          }
        `,
      },
    });

    expect(data[0].id).toEqual(ids[0]);
    expect(data[0].title).toBeUndefined();
    expect(data[1].id).toEqual(ids[1]);
    expect(data[1].title).toBeUndefined();
  });
});
