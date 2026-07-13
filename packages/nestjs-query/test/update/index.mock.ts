import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation UpdateOneBlogPost($input: UpdateOneBlogPostInput!) {\n  updateOneBlogPost(input: $input) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      input: {
        id: "1",
        update: {
          title: "updated-foo",
          content: "updated-bar",
          categoryId: "2",
          status: "PUBLISHED",
        },
      },
    },
    operationName: "UpdateOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        updateOneBlogPost: {
          id: "1",
          title: "updated-foo",
          content: "updated-bar",
          status: "PUBLISHED",
          category: { id: "2" },
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
      "131",
      "ETag",
      'W/"83-Cdu/rGh/wd6iMHduwYzA4i2jnNc"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation UpdateOneBlogPost($input: UpdateOneBlogPostInput!) {\n  updateOneBlogPost(input: $input) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      input: {
        id: "1",
        update: {
          title: "updated-foo",
          content: "updated-bar",
          categoryId: "2",
          status: "PUBLISHED",
        },
      },
    },
    operationName: "UpdateOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        updateOneBlogPost: {
          id: "1",
          title: "updated-foo",
          content: "updated-bar",
          status: "PUBLISHED",
          category: { id: "2" },
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
      "131",
      "ETag",
      'W/"83-Cdu/rGh/wd6iMHduwYzA4i2jnNc"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: UpdateOneBlogPostInput!) {\n      updateOneBlogPost (input: $input) {\n    id, title, content, status, category { id }\n  }\n    }",
    variables: {
      input: {
        id: "1",
        update: {
          title: "updated-foo",
          content: "updated-bar",
          categoryId: "2",
          status: "PUBLISHED",
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        updateOneBlogPost: {
          id: "1",
          title: "updated-foo",
          content: "updated-bar",
          status: "PUBLISHED",
          category: { id: "2" },
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
      "131",
      "ETag",
      'W/"83-Cdu/rGh/wd6iMHduwYzA4i2jnNc"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: UpdateOneBlogPostInput!) {\n      updateOneBlogPost (input: $input) {\n    id\n  }\n    }",
    variables: {
      input: {
        id: "21",
        update: {
          title: "updated-foo-2",
          content: "updated-bar-2",
          categoryId: "3",
          status: "REJECTED",
        },
      },
    },
  })
  .reply(200, { data: { updateOneBlogPost: { id: "21" } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "43",
    "ETag",
    'W/"2b-NNAJ48f76GBu+QFJIqVU7UfN5YA"',
    "Date",
    "Tue, 08 Aug 2023 11:40:35 GMT",
    "Connection",
    "close",
  ]);
