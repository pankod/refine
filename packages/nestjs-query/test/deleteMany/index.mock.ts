import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation DeleteManyBlogPosts($input: DeleteManyBlogPostsInput!) {\n  deleteManyBlogPosts(input: $input) {\n    deletedCount\n  }\n}\n",
    variables: { input: { filter: { id: { in: ["37", "38"] } } } },
    operationName: "DeleteManyBlogPosts",
  })
  .reply(200, { data: { deleteManyBlogPosts: { deletedCount: 2 } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "52",
    "ETag",
    'W/"34-TyRyk9Eipbm0h3MCmbejsSL12SQ"',
    "Date",
    "Tue, 08 Aug 2023 11:40:36 GMT",
    "Connection",
    "close",
  ]);
