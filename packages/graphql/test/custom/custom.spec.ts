import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./custom.mock";

const gqlQuery = gql`
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
`;

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

describe("custom", () => {
  describe("with correct params", () => {
    describe("with gqlQuery", () => {
      it("works as expected", async () => {
        const { data } = await dataProvider(client).custom({
          url: "",
          method: "get",
          meta: {
            gqlQuery,
            gqlVariables: { id: 113 },
          },
        });

        expect(data.blogPost).toBeInstanceOf(Object);
      });
    });
  });

  describe("with gqlMutation", () => {
    it("works as expected", async () => {
      const { data } = await dataProvider(client).custom({
        url: "",
        method: "get",
        meta: {
          gqlMutation,
          gqlVariables: { input: { id: 113, update: { status: "PUBLISHED" } } },
        },
      });

      expect(data.updateOneBlogPost).toBeInstanceOf(Object);
    });
  });

  describe("with custom URL", () => {
    it("should make request to given URL", async () => {
      const { data } = await dataProvider(client).custom({
        url: "https://api.crm.refine.dev/graphql",
        method: "get",
        meta: { gqlQuery },
      });

      expect(data.blogPost).toBeInstanceOf(Object);
    });
  });

  describe("when operation is not provided", () => {
    it("throws error", async () => {
      await expect(
        dataProvider(client).custom({ url: "", method: "get" }),
      ).rejects.toEqual(new Error("[Code] Operation is required."));
    });
  });
});
