import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("useOne", () => {
  describe("gql", () => {
    it("correct response with query", async () => {
      const { data } = await dataProvider(client).getOne({
        resource: "blog_posts",
        id: "1",
        meta: {
          gqlQuery: gql`
                        query GetOneBlogPost($id: ID!) {
                            blogPost(id: $id) {
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

      expect(data["id"]).toBeDefined();
      expect(data["title"]).toBeDefined();
      expect(data["content"]).toBeDefined();
      expect(data["category"].id).toBeDefined();
    });
  });

  it("correct response with mutation", async () => {
    const { data } = await dataProvider(client).getOne({
      resource: "blog_posts",
      id: "1",
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

    expect(data["id"]).toBeDefined();
    expect(data["title"]).toBeDefined();
    expect(data["content"]).toBeDefined();
    expect(data["category"].id).toBeDefined();
  });

  describe("fields (legacy)", () => {
    it("correct response with meta", async () => {
      const { data } = await dataProvider(client).getOne({
        resource: "blog_posts",
        id: "1",
        meta: {
          fields: ["id", "title", "content", "status", { category: ["id"] }],
        },
      });

      expect(data["id"]).toBeDefined();
      expect(data["title"]).toBeDefined();
      expect(data["content"]).toBeDefined();
      expect(data["category"].id).toBeDefined();
    });
  });
});
