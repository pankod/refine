import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "updateMany with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      let postsWithMeta = [
        {
          id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
        {
          id: "881a45fd-a5da-46f4-a045-58eeb647862f",
          title: "Etiam tincidunt ex ut auctor faucibus",
        },
      ];
      let postsWithoutMeta = [
        {
          id: "b8a4c5ee-16a0-4c90-bc8d-84ae7085c575",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
        {
          id: "71cc13bf-6261-4cd4-a892-22250eb0f6b3",
          title: "Etiam tincidunt ex ut auctor faucibus",
        },
      ];

      if (namingConvention === "graphql-default") {
        postsWithMeta = [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
        ];
        postsWithoutMeta = [
          {
            id: "3d71a408-ac30-41f2-b530-3fe951b16b86",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "9cff1379-349e-4a4c-b436-b18d12857c5c",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
        ];
      }

      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).updateMany!({
          resource: "posts",
          ids: postsWithMeta.map((post) => post.id),
          variables: {
            content: "Updated Content",
          },
          meta: {
            fields: ["id", "title", "content"],
          },
        });

        expect(data[0]["id"]).toEqual(postsWithMeta[0]["id"]);
        expect(data[0]["title"]).toEqual(postsWithMeta[0]["title"]);
        expect(data[0]["content"]).toEqual("Updated Content");

        expect(data[1]["id"]).toEqual(postsWithMeta[1]["id"]);
        expect(data[1]["title"]).toEqual(postsWithMeta[1]["title"]);
        expect(data[1]["content"]).toEqual("Updated Content");
      });

      it("correct response without meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).updateMany!({
          resource: "posts",
          ids: postsWithoutMeta.map((post) => post.id),
          variables: {
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
          },
        });

        expect(data[0]["id"]).toEqual(postsWithoutMeta[0]["id"]);
        expect(data[1]["id"]).toEqual(postsWithoutMeta[1]["id"]);
      });
    },
  );
});

describe("with gqlFields", () => {
  it("correct response with hasura-default", async () => {
    const posts = [
      {
        id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
        title: "Aenean ultricies non libero sit amet pellentesque",
      },
      {
        id: "881a45fd-a5da-46f4-a045-58eeb647862f",
        title: "Etiam tincidunt ex ut auctor faucibus",
      },
    ];

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).updateMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      variables: {
        content: "Updated Content",
      },
      meta: {
        gqlMutation: gql`
                    mutation UpdateManyPosts(
                        $ids: [uuid!]!
                        $_set: posts_set_input!
                    ) {
                        update_posts(
                            where: { id: { _in: $ids } }
                            _set: $_set
                        ) {
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

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["title"]).toEqual(posts[0]["title"]);
    expect(data[0]["content"]).toEqual("Updated Content");

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["title"]).toEqual(posts[1]["title"]);
    expect(data[1]["content"]).toEqual("Updated Content");
  });

  it("correct response with  graphql-default", async () => {
    const posts = [
      {
        id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
        title: "Aenean ultricies non libero sit amet pellentesque",
      },
      {
        id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
        title: "Etiam tincidunt ex ut auctor faucibus",
      },
    ];

    const client = createClient("graphql-default");
    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).updateMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      variables: {
        content: "Updated Content",
      },
      meta: {
        gqlMutation: gql`
                    mutation UpdateManyPosts(
                        $ids: [uuid!]!
                        $_set: PostsSetInput!
                    ) {
                        updatePosts(where: { id: { _in: $ids } }, _set: $_set) {
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

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["title"]).toEqual(posts[0]["title"]);
    expect(data[0]["content"]).toEqual("Updated Content");

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["title"]).toEqual(posts[1]["title"]);
    expect(data[1]["content"]).toEqual("Updated Content");
  });

  it("correctly passes variables from meta.gqlVariables to the query", async () => {
    const posts = [
      {
        id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
        title: "Aenean ultricies non libero sit amet pellentesque",
      },
      {
        id: "881a45fd-a5da-46f4-a045-58eeb647862f",
        title: "Etiam tincidunt ex ut auctor faucibus",
      },
    ];

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).updateMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      variables: {
        content: "Updated Content",
      },
      meta: {
        gqlMutation: gql`
          mutation UpdateManyPosts(
            $ids: [uuid!]!,
            $_set: posts_set_input!,
            $includeTitle: Boolean = false
          ) {
            update_posts(
              where: { id: { _in: $ids } },
              _set: $_set
            ) {
              returning {
                id
                content
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

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["title"]).toEqual(posts[0]["title"]);
    expect(data[0]["content"]).toEqual("Updated Content");

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["title"]).toEqual(posts[1]["title"]);
    expect(data[1]["content"]).toEqual("Updated Content");
  });

  it("doesn't pass extra variables to the query without meta.gqlVariables", async () => {
    const posts = [
      {
        id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
        title: "Aenean ultricies non libero sit amet pellentesque",
      },
      {
        id: "881a45fd-a5da-46f4-a045-58eeb647862f",
        title: "Etiam tincidunt ex ut auctor faucibus",
      },
    ];

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).updateMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      variables: {
        content: "Updated Content",
      },
      meta: {
        gqlMutation: gql`
          mutation UpdateManyPosts(
            $ids: [uuid!]!,
            $_set: posts_set_input!,
            $includeTitle: Boolean = false
          ) {
            update_posts(
              where: { id: { _in: $ids } },
              _set: $_set
            ) {
              returning {
                id
                content
                title @include(if: $includeTitle)
              }
            }
          }
        `,
      },
    });

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["content"]).toEqual("Updated Content");
    // Title should not be included in the response
    expect(data[0]["title"]).toBeUndefined();

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["content"]).toEqual("Updated Content");
    // Title should not be included in the response
    expect(data[1]["title"]).toBeUndefined();
  });
});
