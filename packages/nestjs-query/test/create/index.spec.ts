import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("create", () => {
  describe("gql", () => {
    it("correct response with mutation", async () => {
      const { data } = await dataProvider(client).create({
        resource: "blog_posts",
        variables: {
          title: "foo",
          content: "bar",
          categoryId: "1",
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.779Z",
        },
        meta: {
          gqlMutation: gql`
                        mutation CreateOneBlogPost(
                            $input: CreateOneBlogPostInput!
                        ) {
                            createOneBlogPost(input: $input) {
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

      expect(data["title"]).toEqual("foo");
      expect(data["content"]).toEqual("bar");
      expect(data["category"].id).toEqual("1");
      expect(data["status"]).toEqual("DRAFT");
    });

    it("correct response with query", async () => {
      const { data } = await dataProvider(client).create({
        resource: "blog_posts",
        variables: {
          title: "foo",
          content: "bar",
          categoryId: "1",
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.779Z",
        },
        meta: {
          gqlQuery: gql`
                        mutation CreateOneBlogPost(
                            $input: CreateOneBlogPostInput!
                        ) {
                            createOneBlogPost(input: $input) {
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

      expect(data["title"]).toEqual("foo");
      expect(data["content"]).toEqual("bar");
      expect(data["category"].id).toEqual("1");
      expect(data["status"]).toEqual("DRAFT");
    });
  });

  describe("fields (legacy)", () => {
    it("correct response with meta", async () => {
      const { data } = await dataProvider(client).create({
        resource: "blog_posts",
        variables: {
          title: "foo",
          content: "bar",
          categoryId: "1",
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.779Z",
        },
        meta: {
          fields: ["id", "title", "content", "status", { category: ["id"] }],
        },
      });

      expect(data["title"]).toEqual("foo");
      expect(data["content"]).toEqual("bar");
      expect(data["category"].id).toEqual("1");
      expect(data["status"]).toEqual("DRAFT");
    });

    it("correct response without meta", async () => {
      const { data } = await dataProvider(client).create({
        resource: "blog_posts",
        variables: {
          title: "foo",
          content: "bar",
          categoryId: 1,
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.803Z",
        },
      });

      expect(data["id"]).toBeDefined();
    });
  });
});
