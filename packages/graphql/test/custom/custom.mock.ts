import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetOneBlogPost",
    query:
      "\n  query GetOneBlogPost($id: ID!) {\n    blogPost(id: $id) {\n        id\n        title\n        content\n        status\n        category {\n            id\n        }\n    }\n  }\n",
    variables: { id: 113 },
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "113",
          title: "Updated Title 3",
          content:
            "Pariatur est corporis necessitatibus quos consequuntur nostrum. Libero nesciunt delectus sunt eligendi ullam doloribus ratione. Rem dolore odio.\nLaudantium ea quis ut fuga minus molestias facilis laudantium. Hic ut nisi possimus natus asperiores aspernatur. Vel alias placeat ipsum.\nSuscipit quis blanditiis tempora consequatur veniam nam voluptatibus accusamus. Eum dolores sunt eius aperiam perferendis autem eligendi optio perspiciatis. Culpa corrupti nobis incidunt non.",
          status: "REJECTED",
          category: { id: "23" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "593",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 11:37:18 GMT",
      etag: 'W/"251-G8+P5DwQ2zKsMvBGJrZiDiszAEk"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "UpdateOneBlogPost",
    query:
      "\n  mutation UpdateOneBlogPost($input: UpdateOneBlogPostInput!) {\n    updateOneBlogPost(input: $input) {\n      id\n      title\n      content\n      status\n      category {\n        id\n      }\n    }\n  }\n",
    variables: { input: { id: 113, update: { status: "PUBLISHED" } } },
  })
  .reply(
    200,
    {
      data: {
        updateOneBlogPost: {
          id: "113",
          title: "Updated Title 3",
          content:
            "Pariatur est corporis necessitatibus quos consequuntur nostrum. Libero nesciunt delectus sunt eligendi ullam doloribus ratione. Rem dolore odio.\nLaudantium ea quis ut fuga minus molestias facilis laudantium. Hic ut nisi possimus natus asperiores aspernatur. Vel alias placeat ipsum.\nSuscipit quis blanditiis tempora consequatur veniam nam voluptatibus accusamus. Eum dolores sunt eius aperiam perferendis autem eligendi optio perspiciatis. Culpa corrupti nobis incidunt non.",
          status: "PUBLISHED",
          category: { id: "23" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "603",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 11:39:15 GMT",
      etag: 'W/"25b-5dxGIndMA0wPQaFPh6srOGFUbmk"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.crm.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetOneBlogPost",
    query:
      "\n  query GetOneBlogPost($id: ID!) {\n    blogPost(id: $id) {\n        id\n        title\n        content\n        status\n        category {\n            id\n        }\n    }\n  }\n",
    variables: {},
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "113",
          title: "Updated Title 3",
          content:
            "Pariatur est corporis necessitatibus quos consequuntur nostrum. Libero nesciunt delectus sunt eligendi ullam doloribus ratione. Rem dolore odio.\nLaudantium ea quis ut fuga minus molestias facilis laudantium. Hic ut nisi possimus natus asperiores aspernatur. Vel alias placeat ipsum.\nSuscipit quis blanditiis tempora consequatur veniam nam voluptatibus accusamus. Eum dolores sunt eius aperiam perferendis autem eligendi optio perspiciatis. Culpa corrupti nobis incidunt non.",
          status: "REJECTED",
          category: { id: "23" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "593",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 11:37:18 GMT",
      etag: 'W/"251-G8+P5DwQ2zKsMvBGJrZiDiszAEk"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
