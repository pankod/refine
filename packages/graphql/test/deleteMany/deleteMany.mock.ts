import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "DeleteManyBlogPosts",
    query:
      "\nmutation DeleteManyBlogPosts($input: DeleteManyBlogPostsInput!) {\n  deleteManyBlogPosts(input: $input) {\n    deletedCount\n  }\n}\n",
    variables: { input: { filter: { id: { in: ["555", "666"] } } } },
  })
  .reply(
    200,
    { data: { deleteManyBlogPosts: { deletedCount: 0 } } },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "52",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:30:26 GMT",
      etag: 'W/"34-x+xIV36X2nwNHnUhDX6C1lQPkcs"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
