import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { id } } }",
    variables: { filter: { id: { in: ["1", "2"] } } },
  })
  .reply(200, { data: { blogPosts: { nodes: [{ id: "1" }, { id: "2" }] } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "57",
    "ETag",
    'W/"39-U3NxvbJDE9sYWk3pT6aEM9+W7b8"',
    "Date",
    "Tue, 08 Aug 2023 11:40:36 GMT",
    "Connection",
    "close",
  ]);
