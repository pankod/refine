import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation DeleteOneBlogPost($input: DeleteOneBlogPostInput!) {\n  deleteOneBlogPost(input: $input) {\n    id\n    title\n  }\n}\n",
    variables: {
      input: {
        id: "77",
      },
    },
    operationName: "DeleteOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        deleteOneBlogPost: {
          id: null,
          title: "Minima natus nobis modi maiores ducimus.",
        },
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
      "94",
      "ETag",
      'W/"5e-gRLbV/9sZ7rhjSxZaigMyeG4lNc"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation DeleteOneBlogPost($input: DeleteOneBlogPostInput!) {\n  deleteOneBlogPost(input: $input) {\n    id\n  }\n}\n",
    variables: { input: { id: "77" } },
    operationName: "DeleteOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        deleteOneBlogPost: {
          id: null,
          title: "Minima natus nobis modi maiores ducimus.",
        },
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
      "94",
      "ETag",
      'W/"5e-gRLbV/9sZ7rhjSxZaigMyeG4lNc"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation DeleteOneBlogPost($input: DeleteOneBlogPostInput!) {\n  deleteOneBlogPost(input: $input) {\n    id\n  }\n}\n",
    variables: { input: { id: "78" } },
    operationName: "DeleteOneBlogPost",
  })
  .reply(200, { data: { deleteOneBlogPost: { id: null } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "43",
    "ETag",
    'W/"2b-i+dbQkM1wMV6PmRT/8KTdYe4DWI"',
    "Date",
    "Tue, 08 Aug 2023 11:40:35 GMT",
    "Connection",
    "close",
  ]);
