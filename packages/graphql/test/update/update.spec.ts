import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./update.mock";

const gqlMutation = gql`
  mutation UpdateOneBlogPost($input: UpdateOneBlogPostInput!) {
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
`;

describe("update", () => {
  describe("with correct params", () => {
    describe("with gqlMutation", () => {
      it("works as expected", async () => {
        const { data } = await dataProvider(client).update({
          resource: "blogPosts",
          id: "113",
          variables: {
            title: "Updated Title",
          },
          meta: {
            gqlMutation,
          },
        });

        expect(data.id).toEqual("113");
        expect(data.title).toEqual("Updated Title");
      });
    });

    describe("with gqlQuery", () => {
      it("works as expected", async () => {
        const { data } = await dataProvider(client).update({
          resource: "blogPosts",
          id: "113",
          variables: {
            title: "Updated Title 3",
          },
          meta: {
            gqlQuery: gqlMutation,
          },
        });

        expect(data.id).toEqual("113");
        expect(data.title).toEqual("Updated Title 3");
      });
    });
  });

  describe("without operation", () => {
    it("throws error", async () => {
      await expect(
        dataProvider(client).update({
          resource: "blogPosts",
          id: 113,
          variables: {},
        }),
      ).rejects.toEqual(new Error("[Code] Operation is required."));
    });
  });
});
