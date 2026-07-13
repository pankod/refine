import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {\n  updateManyBlogPosts(input: $input) {\n    updatedCount\n  }\n}\n",
    variables: {
      input: {
        filter: { id: { in: ["1", "2"] } },
        update: {
          title: "updated-foo",
          content: "updated-bar",
          categoryId: "2",
          status: "PUBLISHED",
        },
      },
    },
    operationName: "UpdateManyBlogPosts",
  })
  .reply(200, { data: { updateManyBlogPosts: { updatedCount: 2 } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "52",
    "ETag",
    'W/"34-Npx7Rnqa2r+ccONwW/C37p41CPA"',
    "Date",
    "Tue, 08 Aug 2023 11:40:36 GMT",
    "Connection",
    "close",
  ]);

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { id, title, content, category { id }, status } } }",
    variables: { filter: { id: { in: ["1", "2"] } } },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "updated-foo",
              content: "updated-bar",
              category: { id: "2" },
              status: "PUBLISHED",
            },
            {
              id: "2",
              title: "updated-foo",
              content: "updated-bar",
              category: { id: "2" },
              status: "PUBLISHED",
            },
          ],
        },
      },
    },
    [
      "X-Powered-By",
      "Express",
      "cache-control",
      "no-store",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "235",
      "ETag",
      'W/"eb-2PD6087IBjuI0Km+I+xdXaFc30U"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {\n  updateManyBlogPosts(input: $input) {\n    updatedCount\n  }\n}\n",
    variables: {
      input: {
        filter: { id: { in: ["1", "2"] } },
        update: {
          title: "updated-foo-2",
          content: "updated-bar-2",
          categoryId: "3",
          status: "PUBLISHED",
        },
      },
    },
    operationName: "UpdateManyBlogPosts",
  })
  .reply(200, { data: { updateManyBlogPosts: { updatedCount: 2 } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "52",
    "ETag",
    'W/"34-Npx7Rnqa2r+ccONwW/C37p41CPA"',
    "Date",
    "Tue, 08 Aug 2023 11:40:36 GMT",
    "Connection",
    "close",
  ]);

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query GetManyBlogPosts($filter: BlogPostFilter!) {\n  blogPosts(filter: $filter) {\n    nodes {\n      id\n    }\n  }\n}\n",
    variables: { filter: { id: { in: ["1", "2"] } } },
    operationName: "GetManyBlogPosts",
  })
  .reply(200, { data: { blogPosts: { nodes: [{ id: "1" }, { id: "2" }] } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "57",
    "ETag",
    'W/"39-U3NxvbJDE9sYWk3pT6aEM9+W7b8"',
    "Date",
    "Tue, 08 Aug 2023 11:40:36 GMT",
    "Connection",
    "close",
  ]);
