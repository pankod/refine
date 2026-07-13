import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "DeleteOneBlogPost",
    query:
      "\n  mutation DeleteOneBlogPost($input: DeleteOneBlogPostInput!) {\n    deleteOneBlogPost(input: $input) {\n      id\n      title\n    }\n  }\n",
    variables: { input: { id: "42" } },
  })
  .reply(
    200,
    {
      data: {
        deleteOneBlogPost: {
          id: null,
          title: "Corrupti iure voluptas itaque eveniet esse.",
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "97",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:28:58 GMT",
      etag: 'W/"61-ukyMZw/24CfeCUv+M/Arnzlt3RA"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "DeleteOneBlogPost",
    query:
      "\n  mutation DeleteOneBlogPost($input: DeleteOneBlogPostInput!) {\n    deleteOneBlogPost(input: $input) {\n      id\n      title\n    }\n  }\n",
    variables: { input: { id: 999 } },
  })
  .reply(
    200,
    {
      errors: [
        {
          message: "Unable to find BlogPostEntity with id: 999",
          locations: [{ line: 3, column: 5 }],
          path: ["deleteOneBlogPost"],
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            status: 404,
            originalError: {
              message: "Unable to find BlogPostEntity with id: 999",
              error: "Not Found",
              statusCode: 404,
            },
          },
        },
      ],
      data: null,
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "316",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:27:02 GMT",
      etag: 'W/"13c-VXQSJDW6JPVGTNw0ASPD8n8kgQ4"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
