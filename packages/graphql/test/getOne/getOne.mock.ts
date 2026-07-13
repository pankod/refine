import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetOneBlogPost",
    query:
      "\n  query GetOneBlogPost($id: ID!) {\n    blogPost(id: $id) {\n        id\n        title\n        content\n        status\n        category {\n            id\n        }\n    }\n  }\n",
    variables: { id: "19" },
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "19",
          title:
            "Fugit ab odio cupiditate debitis velit similique voluptatem quisquam.",
          content:
            "Amet enim minus unde nemo numquam qui voluptas. Optio amet est rerum fugiat consectetur pariatur. Nobis repellendus repudiandae hic commodi expedita.\nEarum maiores doloribus illo fugit vero commodi aut. Adipisci similique amet quos. Repellendus porro ad doloremque.\nAnimi reiciendis hic necessitatibus alias beatae qui. Dolore porro dolores totam explicabo voluptas architecto. Rerum dolor velit corrupti cum ullam ipsam quam dolorem.",
          status: "PUBLISHED",
          category: { id: "5" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "606",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 11:38:41 GMT",
      etag: 'W/"25e-yzEIOm5DAJ8SHWX4Wli6QCgSruQ"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetBlogPost",
    query:
      "\n        query GetBlogPost($id: ID!) {\n          blogPost(id: $id) {\n            id\ntitle\ncontent\nstatus\ncategory {\n  id\n}\n          }\n        }\n      ",
    variables: { id: "19" },
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "19",
          title:
            "Fugit ab odio cupiditate debitis velit similique voluptatem quisquam.",
          content:
            "Amet enim minus unde nemo numquam qui voluptas. Optio amet est rerum fugiat consectetur pariatur. Nobis repellendus repudiandae hic commodi expedita.\nEarum maiores doloribus illo fugit vero commodi aut. Adipisci similique amet quos. Repellendus porro ad doloremque.\nAnimi reiciendis hic necessitatibus alias beatae qui. Dolore porro dolores totam explicabo voluptas architecto. Rerum dolor velit corrupti cum ullam ipsam quam dolorem.",
          status: "PUBLISHED",
          category: { id: "5" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "606",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 11:38:41 GMT",
      etag: 'W/"25e-yzEIOm5DAJ8SHWX4Wli6QCgSruQ"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetOneBlogPost",
    query:
      "\n  query GetOneBlogPost($id: ID!) {\n    blogPost(id: $id) {\n        id1\n        title\n    }\n  }\n",
    variables: { id: "20" },
  })
  .reply(
    400,
    {
      errors: [
        {
          message:
            'Cannot query field "id1" on type "BlogPost". Did you mean "id"?',
          locations: [{ line: 4, column: 9 }],
          extensions: { code: "GRAPHQL_VALIDATION_FAILED" },
        },
      ],
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "183",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 11:38:42 GMT",
      etag: 'W/"b7-/UfUeZbCOnt1o3cvTCfiTNE3/gI"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
