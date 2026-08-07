import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./getMany.mock";

const gqlQuery = gql`
  query GetManyBlogPosts($filter: BlogPostFilter!) {
    blogPosts(filter: $filter) {
      nodes {
        id
        title
        content
      }
    }
  }
`;

describe("getMany", () => {
  describe("with correct params", () => {
    it("works as expected", async () => {
      const { data } = await dataProvider(client).getMany({
        resource: "blogPosts",
        ids: ["113", "369"],
        meta: {
          gqlQuery,
        },
      });

      expect(data).toHaveLength(2);
      expect(data[0].id).toEqual("113");
      expect(data[1].id).toEqual("369");
    });
  });

  describe("without operation", () => {
    it("throws error", async () => {
      await expect(
        dataProvider(client).getMany({
          resource: "blogPosts",
          ids: [113, 369],
        }),
      ).rejects.toEqual(new Error("[Code] Operation is required."));
    });
  });
});
