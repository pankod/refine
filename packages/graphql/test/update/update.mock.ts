import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "UpdateOneBlogPost",
    query:
      "\n  mutation UpdateOneBlogPost($input: UpdateOneBlogPostInput!) {\n    updateOneBlogPost(input: $input) {\n      id\n      title\n      content\n      status\n      category {\n        id\n      }\n    }\n  }\n",
    variables: { input: { id: "113", update: { title: "Updated Title" } } },
  })
  .reply(
    200,
    {
      data: {
        updateOneBlogPost: {
          id: "113",
          title: "Updated Title",
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
      "content-length": "600",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 08:18:55 GMT",
      etag: 'W/"258-AA+M1e4mSDoEu21TBB2hGDNoEPU"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "UpdateOneBlogPost",
    query:
      "\n  mutation UpdateOneBlogPost($input: UpdateOneBlogPostInput!) {\n    updateOneBlogPost(input: $input) {\n      id\n      title\n      content\n      status\n      category {\n        id\n      }\n    }\n  }\n",
    variables: { input: { id: "113", update: { title: "Updated Title 3" } } },
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
          status: "REJECTED",
          category: { id: "23" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "602",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 08:18:55 GMT",
      etag: 'W/"25a-c8WgwubQp6YuTodKaItk5liXqas"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
