import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query GetOneBlogPost($id: ID!) {\n  blogPost(id: $id) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      id: "1",
    },
    operationName: "GetOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "1",
          title: "updated-foo-2",
          content: "updated-bar-2",
          status: "PUBLISHED",
          category: { id: "3" },
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
      "126",
      "ETag",
      'W/"7e-Cl5he/nvkiuG9ZY19THgesoMW0g"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query GetOneBlogPost($id: ID!) {\n  blogPost(id: $id) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      id: "1",
    },
    operationName: "GetOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "1",
          title: "updated-foo-2",
          content: "updated-bar-2",
          status: "PUBLISHED",
          category: { id: "3" },
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
      "126",
      "ETag",
      'W/"7e-Cl5he/nvkiuG9ZY19THgesoMW0g"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query GetBlogPost($id: ID!) {\n  blogPost(id: $id) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      id: "1",
    },
    operationName: "GetBlogPost",
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "1",
          title: "updated-foo-2",
          content: "updated-bar-2",
          status: "PUBLISHED",
          category: { id: "3" },
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
      "126",
      "ETag",
      'W/"7e-Cl5he/nvkiuG9ZY19THgesoMW0g"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($id: ID!) { blogPost (id: $id) { id, title, content, status, category { id } } }",
    variables: { id: "1" },
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "1",
          title: "updated-foo-2",
          content: "updated-bar-2",
          status: "PUBLISHED",
          category: { id: "3" },
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
      "126",
      "ETag",
      'W/"7e-Cl5he/nvkiuG9ZY19THgesoMW0g"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );
