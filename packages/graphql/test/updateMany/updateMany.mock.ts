import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "UpdateManyBlogPosts",
    query:
      "\nmutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {\n  updateManyBlogPosts(input: $input) {\n    updatedCount\n  }\n}\n",
    variables: {
      input: {
        filter: { id: { in: ["1", "2"] } },
        update: { status: "PUBLISHED" },
      },
    },
  })
  .reply(
    200,
    { data: { updateManyBlogPosts: { updatedCount: 2 } } },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "52",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:35:28 GMT",
      etag: 'W/"34-Npx7Rnqa2r+ccONwW/C37p41CPA"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
