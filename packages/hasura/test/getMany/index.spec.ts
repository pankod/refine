import gql from "graphql-tag";
import type { DocumentNode } from "graphql";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

// import nock from "nock";
// nock.recorder.rec();

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "updateMany with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      let posts = [
        {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
        {
          id: "478212ed-9a78-428c-b418-306bd88e0790",
          title: "Etiam tincidunt ex ut auctor faucibus",
          content: "Aliquam nibh erat.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      ];

      let ids = posts.map((post) => post.id);

      if (namingConvention === "graphql-default") {
        posts = [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ];

        ids = posts.map((post) => post.id);
      }

      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).getMany!({
          resource: "posts",
          ids,
          meta: {
            fields: ["id", "title", "content", { category: ["id"] }],
          },
        });

        expect(data[0]["id"]).toEqual(posts[0]["id"]);
        expect(data[0]["title"]).toEqual(posts[0]["title"]);
        expect(data[0]["content"]).toEqual(posts[0]["content"]);
        expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

        expect(data[1]["id"]).toEqual(posts[1]["id"]);
        expect(data[1]["title"]).toEqual(posts[1]["title"]);
        expect(data[1]["content"]).toEqual(posts[1]["content"]);
        expect(data[1]["category"].id).toEqual(posts[1]["category"]["id"]);
      });
    },
  );
});

describe("with gqlQuery", () => {
  it("correct response hasura-default", async () => {
    const client = createClient("hasura-default");
    const posts = [
      {
        id: "572708c7-840d-430a-befd-1416bdee799a",
        title: "Aenean ultricies non libero sit amet pellentesque",
        content: "Vestibulum vulputate sapien arcu.",
        category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
      },
      {
        id: "478212ed-9a78-428c-b418-306bd88e0790",
        title: "Etiam tincidunt ex ut auctor faucibus",
        content: "Aliquam nibh erat.",
        category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
      },
    ];

    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      meta: {
        gqlQuery: gql`
                    query GetPosts($where: posts_bool_exp!) {
                        posts(where: $where) {
                            id
                            title
                            content
                            category {
                                id
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

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["title"]).toEqual(posts[0]["title"]);
    expect(data[0]["content"]).toEqual(posts[0]["content"]);
    expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["title"]).toEqual(posts[1]["title"]);
    expect(data[1]["content"]).toEqual(posts[1]["content"]);
    expect(data[1]["category"].id).toEqual(posts[1]["category"]["id"]);
  });

  it("correct response graphql-default", async () => {
    const client = createClient("graphql-default");
    const posts = [
      {
        id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
        title: "Aenean ultricies non libero sit amet pellentesque",
        content: "Vestibulum vulputate sapien arcu.",
        category: {
          id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      },
      {
        id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
        title: "Etiam tincidunt ex ut auctor faucibus",
        content: "Aliquam nibh erat.",
        category: {
          id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      },
    ];

    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).getMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      meta: {
        gqlQuery: gql`
                    query GetPosts($where: PostsBoolExp!) {
                        posts(where: $where) {
                            id
                            title
                            content
                            category {
                                id
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

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["title"]).toEqual(posts[0]["title"]);
    expect(data[0]["content"]).toEqual(posts[0]["content"]);
    expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["title"]).toEqual(posts[1]["title"]);
    expect(data[1]["content"]).toEqual(posts[1]["content"]);
    expect(data[1]["category"].id).toEqual(posts[1]["category"]["id"]);
  });
});

describe("with gqlVariables", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "getMany with %s naming convention",
    (namingConvention) => {
      let gqlQuery: DocumentNode;
      if (namingConvention === "hasura-default") {
        gqlQuery = gql`
            query GetPosts($where: posts_bool_exp!) {
                posts(where: $where) {
                    id
                    title
                    content
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
            query GetPosts($where: PostsBoolExp!) {
                posts(where: $where) {
                    id
                    title
                    content
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
      it("correct response hasura-default with single hasura operator content filter", async () => {
        const client = createClient(namingConvention);
        const posts = [
          {
            id: "572708c7-840d-430a-befd-1416bdee799a",
            title: "Updated Title",
            content: "Updated Content",
            category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
          },
          {
            id: "478212ed-9a78-428c-b418-306bd88e0790",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
          },
        ];

        const { data } = await dataProvider(client, {
          namingConvention,
        }).getMany!({
          resource: "posts",
          ids: posts.map((post) => post.id),
          meta: {
            gqlQuery,
            gqlVariables: {
              where: {
                content: { _neq: "Updated Content" },
              },
            },
          },
        });

        expect(data.length).toBe(1);

        expect(data[0]["id"]).toEqual(posts[1]["id"]);
        expect(data[0]["title"]).toEqual(posts[1]["title"]);
        expect(data[0]["content"]).toEqual(posts[1]["content"]);
        expect(data[0]["category"].id).toEqual(posts[1]["category"]["id"]);
      });

      it("correct request/response where like %updated%", async () => {
        const client = createClient(namingConvention);
        const posts = [
          {
            id: "7f690a87-db33-4a8f-b02d-e6d4a7241a9b",
            title: "123",
            content: "123123",
            category: { id: "adfd9627-9a4d-4bef-8ded-a927c800804d" },
          },
          {
            id: "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            title: "updated title3",
            content: "dasdasd",
            category: { id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7" },
          },
          {
            id: "7af17f71-1ddf-4969-bcec-565f05b16098",
            title: "updated title3",
            content: "123123",
            category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
          },
          {
            id: "d52e6a60-dfd2-4b2c-b443-62b64b6b3aa0",
            title: "123",
            content: "123123",
            category: { id: "0ea181ad-dd28-4844-bfc6-fd278e46710d" },
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            content: "CREATED content23",
            category: { id: "0386c795-d8b2-40fd-b115-69ab60e7c098" },
          },
        ];

        const { data } = await dataProvider(client, {
          namingConvention,
        }).getMany!({
          resource: "posts",
          ids: posts.map((post) => post.id),
          meta: {
            gqlQuery,
            gqlVariables: {
              where: {
                title: { _ilike: "%updated%" },
              },
            },
          },
        });

        expect(data.length).toBe(3);

        expect(data[0]["id"]).toEqual(posts[1]["id"]);
        expect(data[0]["title"]).toEqual(posts[1]["title"]);
        expect(data[0]["content"]).toEqual(posts[1]["content"]);
        expect(data[0]["category"].id).toEqual(posts[1]["category"]["id"]);

        expect(data[1]["id"]).toEqual(posts[2]["id"]);
        expect(data[1]["title"]).toEqual(posts[2]["title"]);
        expect(data[1]["content"]).toEqual(posts[2]["content"]);
        expect(data[1]["category"].id).toEqual(posts[2]["category"]["id"]);

        expect(data[2]["id"]).toEqual(posts[4]["id"]);
        expect(data[2]["title"]).toEqual(posts[4]["title"]);
        expect(data[2]["content"]).toEqual(posts[4]["content"]);
        expect(data[2]["category"].id).toEqual(posts[4]["category"]["id"]);
      });

      it("builds request with multiple filters and receives accurate response", async () => {
        const client = createClient(namingConvention);

        const posts = [
          {
            id: "203f94d4-396a-454c-a92e-947ec6bacb37",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "294c278e-4e3d-4a40-88ee-208f47a42e7e",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "2d2af5b8-70ed-46a3-873b-f79e92226c97",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "1d7493ca-1401-48d3-9b92-d400fe0fbd16",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "3d71a408-ac30-41f2-b530-3fe951b16b86",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "0b5e9ce1-e686-4ab6-909b-e51235f028a9",
            title: "updated ws1231",
            content: "Lorem ipsum dolor sit amet.",
            category: {
              id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
              title: "sed accumsan felixxx",
            },
          },
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            content: "CREATED content1",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            content: "CREATED content23",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
          {
            id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
            title: "Updated Title",
            content: "Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
        ];

        const categoryIdkey =
          namingConvention === "hasura-default" ? "category_id" : "categoryId";

        const { data } = await dataProvider(client, {
          namingConvention,
        }).getMany!({
          resource: "posts",
          ids: posts.map((post) => post.id),
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
                    title: { _ilike: "%updated%" },
                  },
                ],
                _or: [
                  {
                    [categoryIdkey]: {
                      _eq: "e27156c3-9998-434f-bd5b-2b078283ff26",
                    },
                  },
                  {
                    [categoryIdkey]: {
                      _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
                    },
                  },
                ],
              },
            },
          },
        });

        expect(data.length).toBe(7);

        expect(data[0]["id"]).toEqual(posts[0]["id"]);
        expect(data[0]["title"]).toEqual(posts[0]["title"]);
        expect(data[0]["content"]).toEqual(posts[0]["content"]);
        expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

        expect(data[6]["id"]).toEqual(posts[9]["id"]);
        expect(data[6]["title"]).toEqual(posts[9]["title"]);
        expect(data[6]["content"]).toEqual(posts[9]["content"]);
        expect(data[6]["category"].id).toEqual(posts[9]["category"]["id"]);

        expect(data[5]["id"]).toEqual(posts[5]["id"]);
        expect(data[5]["title"]).toEqual(posts[5]["title"]);
        expect(data[5]["content"]).toEqual(posts[5]["content"]);
        expect(data[5]["category"].id).toEqual(posts[5]["category"]["id"]);
      });
    },
  );
});
