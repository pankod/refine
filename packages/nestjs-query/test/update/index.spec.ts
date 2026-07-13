import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("create", () => {
  describe("gql", () => {
    it("correct response with mutation", async () => {
      const { data } = await dataProvider(client).update({
        resource: "blog_posts",
        id: "1",
        variables: {
          title: "updated-foo",
          content: "updated-bar",
          categoryId: "2",
          status: "PUBLISHED",
        },
        meta: {
          gqlMutation: gql`
                        mutation UpdateOneBlogPost(
                            $input: UpdateOneBlogPostInput!
                        ) {
                            updateOneBlogPost(input: $input) {
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

      expect(data["title"]).toEqual("updated-foo");
      expect(data["content"]).toEqual("updated-bar");
      expect(data["category"].id).toEqual("2");
      expect(data["status"]).toEqual("PUBLISHED");
    });

    it("correct response with query", async () => {
      const { data } = await dataProvider(client).update({
        resource: "blog_posts",
        id: "1",
        variables: {
          title: "updated-foo",
          content: "updated-bar",
          categoryId: "2",
          status: "PUBLISHED",
        },
        meta: {
          gqlQuery: gql`
                        mutation UpdateOneBlogPost(
                            $input: UpdateOneBlogPostInput!
                        ) {
                            updateOneBlogPost(input: $input) {
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

      expect(data["title"]).toEqual("updated-foo");
      expect(data["content"]).toEqual("updated-bar");
      expect(data["category"].id).toEqual("2");
      expect(data["status"]).toEqual("PUBLISHED");
    });
  });

  describe("fields (legacy)", () => {
    it("correct response with meta", async () => {
      const { data } = await dataProvider(client).update({
        resource: "blog_posts",
        id: "1",
        variables: {
          title: "updated-foo",
          content: "updated-bar",
          categoryId: "2",
          status: "PUBLISHED",
        },
        meta: {
          fields: ["id", "title", "content", "status", { category: ["id"] }],
        },
      });

      expect(data["title"]).toEqual("updated-foo");
      expect(data["content"]).toEqual("updated-bar");
      expect(data["category"].id).toEqual("2");
      expect(data["status"]).toEqual("PUBLISHED");
    });

    it("correct response without meta", async () => {
      const { data } = await dataProvider(client).update({
        resource: "blog_posts",
        id: "21",
        variables: {
          title: "updated-foo-2",
          content: "updated-bar-2",
          categoryId: "3",
          status: "REJECTED",
        },
      });

      expect(data["id"]).toBeDefined();
    });
  });
});
