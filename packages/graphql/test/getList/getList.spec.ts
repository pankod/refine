import dataProvider from "../../src/index";
import client from "../gqlClient";
import gql from "graphql-tag";
import "./getList.mock";

const gqlQuery = gql`
  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {
    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        title
        status
      }
      totalCount
    }
  }
`;

const gqlQueryError = gql`
  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {
    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id1
        title
        status
      }
      totalCount
    }
  }
`;

describe("getList", () => {
  it("default params", async () => {
    const { data, total } = await dataProvider(client).getList({
      resource: "blogPosts",
      meta: {
        gqlQuery: gqlQuery,
      },
    });

    expect(data[0].id).toBe("3");
    expect(data.length).toBe(10);
    expect(total).toBe(503);
  });

  describe("pagination", () => {
    it("current", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        pagination: {
          currentPage: 2,
        },
      });

      expect(data[0].id).toBe("14");
    });

    it("pageSize", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        pagination: {
          pageSize: 2,
        },
      });

      expect(data.length).toBe(2);
    });

    describe("mode", () => {
      it("off", async () => {
        const { data } = await dataProvider(client).getList({
          resource: "blogPosts",
          meta: {
            gqlQuery: gqlQuery,
          },
          pagination: {
            mode: "off",
          },
        });

        expect(data.length).toBe(503);
      });

      it("server", async () => {
        const { data } = await dataProvider(client).getList({
          resource: "blogPosts",
          meta: {
            gqlQuery: gqlQuery,
          },
          pagination: {
            mode: "server",
          },
        });
      });
    });
  });

  describe("sorters", () => {
    it("sort by id desc", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        sorters: [{ field: "id", order: "desc" }],
      });

      expect(data[0].id).toBe("507");
    });
  });

  describe("filters", () => {
    it("default", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        filters: [{ field: "status", operator: "eq", value: "DRAFT" }],
      });

      data.forEach((d) => expect(d.status).toBe("DRAFT"));
    });

    it("and", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        filters: [
          {
            operator: "and",
            value: [
              { field: "status", operator: "eq", value: "DRAFT" },
              { field: "id", operator: "lt", value: 10 },
            ],
          },
        ],
      });

      expect(data.length).toBe(1);
      expect(data[0].status).toBe("DRAFT");
    });

    it("or", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        filters: [
          {
            operator: "or",
            value: [
              { field: "status", operator: "eq", value: "DRAFT" },
              { field: "status", operator: "eq", value: "PUBLISHED" },
            ],
          },
        ],
      });

      data.forEach((d) => expect(d.status).not.toBe("REJECTED"));
    });
  });

  describe("without operation", () => {
    it("throws code error", async () => {
      await expect(
        dataProvider(client).getList({
          resource: "blogPosts",
        }),
      ).rejects.toEqual(new Error("[Code] Operation is required."));
    });
  });

  describe("incorrect item", () => {
    it("throws graphql error", async () => {
      await expect(
        dataProvider(client).getList({
          resource: "blogPosts",
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
});
