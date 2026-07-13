import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("deleteOne", () => {
  describe("gql", () => {
    it("correct response with gql mutation", async () => {
      const { data } = await dataProvider(client).deleteOne({
        resource: "blog_posts",
        id: "77",
        meta: {
          gqlMutation: gql`
                        mutation DeleteOneBlogPost(
                            $input: DeleteOneBlogPostInput!
                        ) {
                            deleteOneBlogPost(input: $input) {
                                id
                                title
                            }
                        }
                    `,
        },
      });

      expect(data.id).toEqual(null);
      expect(data.title).toBeDefined();
    });
  });

  describe("fields (legacy)", () => {
    it("correct response with meta", async () => {
      const { data } = await dataProvider(client).deleteOne({
        resource: "blog_posts",
        id: "77",
        meta: {
          fields: ["id", "title"],
        },
      });

      expect(data.id).toEqual(null);
      expect(data.title).toBeDefined();
    });

    it("correct response without meta", async () => {
      const { data } = await dataProvider(client).deleteOne({
        resource: "blog_posts",
        id: "78",
      });

      expect(data.id).toEqual(null);
    });
  });
});
