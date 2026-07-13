import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

const mockData = {
  post: {
    "hasura-default": {
      id: "572708c7-840d-430a-befd-1416bdee799a",
      title: "Aenean ultricies non libero sit amet pellentesque",
      content: "Vestibulum vulputate sapien arcu.",
      category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
    },
    "graphql-default": {
      id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
      title: "Aenean ultricies non libero sit amet pellentesque",
      content: "Vestibulum vulputate sapien arcu.",
      category: {
        id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
  },
  user: {
    id: 1,
    name: "Refine",
    email: "mail@refine.dev",
  },
} as const;

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "updateOne with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).getOne({
          resource: "posts",
          id: mockData.post[namingConvention].id,
          meta: {
            fields: ["id", "title", "content", { category: ["id"] }],
          },
        });

        expect(data["id"]).toEqual(mockData.post[namingConvention].id);
        expect(data["title"]).toEqual(mockData.post[namingConvention].title);
        expect(data["content"]).toEqual(
          mockData.post[namingConvention].content,
        );
        expect(data["category"].id).toEqual(
          mockData.post[namingConvention].category.id,
        );
      });

      it("correct response with meta and custom idType", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
          idType: "Int",
        }).getOne({
          resource: "users",
          id: mockData["user"].id,
          meta: {
            fields: ["id", "name", "email"],
          },
        });

        expect(data["id"]).toEqual(mockData["user"].id);
        expect(data["name"]).toEqual(mockData["user"].name);
        expect(data["email"]).toEqual(mockData["user"].email);
      });

      it("correct response with meta and dynamic idType", async () => {
        const idTypeMap: Record<string, "Int" | "uuid"> = {
          users: "Int",
          posts: "uuid",
        };
        const cDataProvider = dataProvider(client, {
          namingConvention,
          idType: (resource) => idTypeMap[resource] ?? "uuid",
        });
        const { data: userData } = await cDataProvider.getOne({
          resource: "users",
          id: mockData["user"].id,
          meta: {
            fields: ["id", "name", "email"],
          },
        });

        expect(userData["id"]).toEqual(mockData["user"].id);
        expect(userData["name"]).toEqual(mockData["user"].name);
        expect(userData["email"]).toEqual(mockData["user"].email);

        const { data: postData } = await cDataProvider.getOne({
          resource: "posts",
          id: mockData.post[namingConvention].id,
          meta: {
            fields: ["id", "title", "content", { category: ["id"] }],
          },
        });

        expect(postData["id"]).toEqual(mockData.post[namingConvention].id);
        expect(postData["title"]).toEqual(
          mockData.post[namingConvention].title,
        );
        expect(postData["content"]).toEqual(
          mockData.post[namingConvention].content,
        );
        expect(postData["category"].id).toEqual(
          mockData.post[namingConvention].category.id,
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

      const { data } = await dataProvider(client, {
        namingConvention: "hasura-default",
      }).getOne({
        resource: "posts",
        id: mockData.post["hasura-default"].id,
        meta: {
          [gqlOperation]: gql`
                        query GetPost($id: uuid!) {
                            posts_by_pk(id: $id) {
                                id
                                title
                                content
                                category {
                                    id
                                }
                            }
                        }
                    `,
          gqlVariables: {
            foo: "bar",
          },
        },
      });

      expect(data["id"]).toEqual(mockData.post["hasura-default"].id);
      expect(data["title"]).toEqual(mockData.post["hasura-default"].title);
      expect(data["content"]).toEqual(mockData.post["hasura-default"].content);
      expect(data["category"].id).toEqual(
        mockData.post["hasura-default"].category.id,
      );
    },
  );

  it.each(["gqlQuery", "gqlMutation"] as const)(
    "correct response with graphql-default & %s",
    async (gqlOperation) => {
      const client = createClient("graphql-default");

      const { data } = await dataProvider(client, {
        namingConvention: "graphql-default",
        idType: "Int",
      }).getOne({
        resource: "users",
        id: mockData.user.id,
        meta: {
          [gqlOperation]: gql`
                        query GetUser($id: Int!) {
                            usersByPk(id: $id) {
                                id
                                name
                                email
                            }
                        }
                    `,
        },
      });

      expect(data["id"]).toEqual(mockData["user"].id);
      expect(data["name"]).toEqual(mockData["user"].name);
      expect(data["email"]).toEqual(mockData["user"].email);
    },
  );
});
