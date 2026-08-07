import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "CreateManyBlogPosts",
    query:
      "\n  mutation CreateManyBlogPosts(\n    $input: CreateManyBlogPostsInput!\n  ) {\n    createManyBlogPosts(input: $input) {\n        id\n        title\n        content\n        category {\n            id\n        }\n    }\n  }\n",
    variables: {
      input: {
        blogPosts: [
          { categoryId: "1", content: "bar1", status: "DRAFT", title: "foo1" },
          { categoryId: "2", content: "bar2", status: "DRAFT", title: "foo2" },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        createManyBlogPosts: [
          { id: "505", title: "foo1", content: "bar1", category: { id: "1" } },
          { id: "506", title: "foo2", content: "bar2", category: { id: "2" } },
        ],
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "169",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 11:40:16 GMT",
      etag: 'W/"a9-W9IwWmaqsrSR9pGwGCGez3wiqqs"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
