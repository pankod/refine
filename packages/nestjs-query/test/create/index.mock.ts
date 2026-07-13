import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation CreateOneBlogPost($input: CreateOneBlogPostInput!) {\n  createOneBlogPost(input: $input) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      input: {
        blogPost: {
          title: "foo",
          content: "bar",
          categoryId: "1",
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.779Z",
        },
      },
    },
    operationName: "CreateOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        createOneBlogPost: {
          id: "1001",
          title: "foo",
          content: "bar",
          status: "DRAFT",
          category: { id: "1" },
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
      "114",
      "ETag",
      'W/"72-A2HL3UV7Tw+15hnizLfoZhmQ0jM"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation CreateOneBlogPost($input: CreateOneBlogPostInput!) {\n  createOneBlogPost(input: $input) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      input: {
        blogPost: {
          title: "foo",
          content: "bar",
          categoryId: "1",
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.779Z",
        },
      },
    },
    operationName: "CreateOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        createOneBlogPost: {
          id: "1001",
          title: "foo",
          content: "bar",
          status: "DRAFT",
          category: { id: "1" },
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
      "114",
      "ETag",
      'W/"72-A2HL3UV7Tw+15hnizLfoZhmQ0jM"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: CreateOneBlogPostInput!) {\n      createOneBlogPost (input: $input) {\n    id, title, content, status, category { id }\n  }\n    }",
    variables: {
      input: {
        blogPost: {
          title: "foo",
          content: "bar",
          categoryId: "1",
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.779Z",
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        createOneBlogPost: {
          id: "1001",
          title: "foo",
          content: "bar",
          status: "DRAFT",
          category: { id: "1" },
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
      "114",
      "ETag",
      'W/"72-A2HL3UV7Tw+15hnizLfoZhmQ0jM"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: CreateOneBlogPostInput!) {\n      createOneBlogPost (input: $input) {\n    id\n  }\n    }",
    variables: {
      input: {
        blogPost: {
          title: "foo",
          content: "bar",
          categoryId: 1,
          status: "DRAFT",
          createdAt: "2023-08-08T11:40:35.803Z",
        },
      },
    },
  })
  .reply(200, { data: { createOneBlogPost: { id: "1002" } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "45",
    "ETag",
    'W/"2d-geYivD+l9cwJ3+js94y88rr0HeA"',
    "Date",
    "Tue, 08 Aug 2023 11:40:35 GMT",
    "Connection",
    "close",
  ]);
