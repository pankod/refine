import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./updateMany.mock";

const gqlMutation = gql`
mutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {
  updateManyBlogPosts(input: $input) {
    updatedCount
  }
}
`;

describe("updateMany", () => {
  describe("with correct params", () => {
    it("works as expected", async () => {
      const ids = ["1", "2"];
      const { data } = await dataProvider(client).updateMany({
        resource: "blogPosts",
        ids,
        meta: {
          gqlMutation,
        },
        variables: { status: "PUBLISHED" },
      });

      expect(data).toEqual(ids.map((id) => ({ id })));
    });
  });

  describe("without operation", () => {
    it("throws error", async () => {
      await expect(
        dataProvider(client).updateMany({
          resource: "blogPosts",
          ids: [1, 2],
          variables: { status: "PUBLISHED" },
        }),
      ).rejects.toEqual(new Error("[Code] Operation is required."));
    });
  });
});
