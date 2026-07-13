import dataProvider from "../../src/index";
import client from "../gqlClient";
import gql from "graphql-tag";
import "./createMany.mock";

const gqlMutation = gql`
  mutation CreateManyBlogPosts(
    $input: CreateManyBlogPostsInput!
  ) {
    createManyBlogPosts(input: $input) {
        id
        title
        content
        category {
            id
        }
    }
  }
`;

describe("createMany", () => {
  describe("with correct params", () => {
    it("works as expected", async () => {
      const { data } = await dataProvider(client).createMany({
        resource: "blogPosts",
        variables: [
          {
            title: "foo1",
            content: "bar1",
            status: "DRAFT",
            categoryId: "1",
          },
          {
            title: "foo2",
            content: "bar2",
            status: "DRAFT",
            categoryId: "2",
          },
        ],
        meta: {
          gqlMutation,
        },
      });

      expect(data[0].title).toEqual("foo1");
      expect(data[0].content).toEqual("bar1");
      expect(data[0].category.id).toEqual("1");

      expect(data[1].title).toEqual("foo2");
      expect(data[1].content).toEqual("bar2");
      expect(data[1].category.id).toEqual("2");
    });
  });

  describe("without operation", () => {
    it("throws error", async () => {
      await expect(
        dataProvider(client).createMany({
          resource: "blogPosts",
          variables: [],
        }),
      ).rejects.toEqual(new Error("[Code] Operation is required."));
    });
  });
});
