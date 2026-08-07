import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./getOne.mock";

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

const gqlQueryError = gql`
  query GetOneBlogPost($id: ID!) {
    blogPost(id: $id) {
        id1
        title
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

describe("useOne", () => {
  it("correct response with query", async () => {
    const { data } = await dataProvider(client).getOne({
      resource: "blogPosts",
      id: "19",
      meta: {
        gqlQuery,
      },
    });

    expect(data["id"]).toBeDefined();
    expect(data["title"]).toBeDefined();
    expect(data["content"]).toBeDefined();
    expect(data["category"].id).toBeDefined();
  });

  it("correct response with mutation", async () => {
    const { data } = await dataProvider(client).getOne({
      resource: "blogPosts",
      id: "19",
      meta: {
        gqlMutation,
      },
    });

    expect(data["id"]).toBeDefined();
    expect(data["title"]).toBeDefined();
    expect(data["content"]).toBeDefined();
    expect(data["category"].id).toBeDefined();
  });
});

describe("incorrect item", () => {
  it("throws graphql error", async () => {
    await expect(
      dataProvider(client).getOne({
        resource: "blogPosts",
        id: "20",
        meta: {
          gqlQuery: gqlQueryError,
        },
      }),
    ).rejects.toEqual(
      new Error(
        '[GraphQL] Cannot query field "id1" on type "BlogPost". Did you mean "id"?',
      ),
    );
  });
});
