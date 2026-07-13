import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation CreateManyBlogPosts($input: CreateManyBlogPostsInput!) {\n  createManyBlogPosts(input: $input) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      input: {
        blogPosts: [
          {
            title: "foo",
            content: "bar",
            categoryId: "2",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.177Z",
          },
          {
            title: "foo-2",
            content: "bar-2",
            categoryId: "3",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.177Z",
          },
        ],
      },
    },
    operationName: "CreateManyBlogPosts",
  })
  .reply(
    200,
    {
      data: {
        createManyBlogPosts: [
          {
            id: "1003",
            title: "foo",
            content: "bar",
            category: { id: "2" },
          },
          {
            id: "1004",
            title: "foo-2",
            content: "bar-2",
            category: { id: "3" },
          },
        ],
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
      "171",
      "ETag",
      'W/"ab-Qwn6zl923OOXCGEpfhprr8YGndY"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation CreateManyBlogPosts($input: CreateManyBlogPostsInput!) {\n  createManyBlogPosts(input: $input) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      input: {
        blogPosts: [
          {
            title: "foo",
            content: "bar",
            categoryId: "2",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.177Z",
          },
          {
            title: "foo-2",
            content: "bar-2",
            categoryId: "3",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.177Z",
          },
        ],
      },
    },
    operationName: "CreateManyBlogPosts",
  })
  .reply(
    200,
    {
      data: {
        createManyBlogPosts: [
          {
            id: "1003",
            title: "foo",
            content: "bar",
            category: { id: "2" },
          },
          {
            id: "1004",
            title: "foo-2",
            content: "bar-2",
            category: { id: "3" },
          },
        ],
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
      "171",
      "ETag",
      'W/"ab-Qwn6zl923OOXCGEpfhprr8YGndY"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: CreateManyBlogPostsInput!) {\n      createManyBlogPosts (input: $input) {\n    id, title, content, category { id }\n  }\n    }",
    variables: {
      input: {
        blogPosts: [
          {
            title: "foo",
            content: "bar",
            categoryId: "2",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.177Z",
          },
          {
            title: "foo-2",
            content: "bar-2",
            categoryId: "3",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.177Z",
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        createManyBlogPosts: [
          {
            id: "1003",
            title: "foo",
            content: "bar",
            category: { id: "2" },
          },
          {
            id: "1004",
            title: "foo-2",
            content: "bar-2",
            category: { id: "3" },
          },
        ],
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
      "171",
      "ETag",
      'W/"ab-Qwn6zl923OOXCGEpfhprr8YGndY"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: CreateManyBlogPostsInput!) {\n      createManyBlogPosts (input: $input) {\n    id\n  }\n    }",
    variables: {
      input: {
        blogPosts: [
          {
            title: "foo",
            content: "bar",
            categoryId: "2",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.197Z",
          },
          {
            title: "foo-2",
            content: "bar-2",
            categoryId: "3",
            status: "DRAFT",
            createdAt: "2023-08-08T11:40:36.197Z",
          },
        ],
      },
    },
  })
  .reply(
    200,
    { data: { createManyBlogPosts: [{ id: "1005" }, { id: "1006" }] } },
    [
      "X-Powered-By",
      "Express",
      "cache-control",
      "no-store",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "63",
      "ETag",
      'W/"3f-Thn1Dht2B1sIOz6A1MjOsIeYG6k"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );
