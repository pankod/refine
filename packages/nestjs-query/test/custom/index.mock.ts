import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {\n  updateManyBlogPosts(input: $input) {\n    updatedCount\n  }\n}\n",
    variables: {
      input: {
        value: {
          filter: {
            id: {
              in: ["42"],
            },
          },
          update: {
            status: "REJECTED",
          },
        },
        type: "UpdateManyBlogPostsInput",
        required: true,
      },
    },
    operationName: "UpdateManyBlogPosts",
  })
  .reply(200, { data: { updateManyBlogPosts: { updatedCount: 1 } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "52",
    "ETag",
    'W/"34-q7TcgM8PgtPGtmI2KSKG50FWvSI"',
    "Date",
    "Tue, 08 Aug 2023 11:40:35 GMT",
    "Connection",
    "close",
  ]);

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: UpdateManyBlogPostsInput!) {\n      updateManyBlogPosts (input: $input) {\n    updatedCount\n  }\n    }",
    variables: {
      input: {
        filter: { id: { in: ["42"] } },
        update: { status: "REJECTED" },
      },
    },
  })
  .reply(200, { data: { updateManyBlogPosts: { updatedCount: 1 } } }, [
    "X-Powered-By",
    "Express",
    "cache-control",
    "no-store",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "52",
    "ETag",
    'W/"34-q7TcgM8PgtPGtmI2KSKG50FWvSI"',
    "Date",
    "Tue, 08 Aug 2023 11:40:35 GMT",
    "Connection",
    "close",
  ]);

nock("http://localhost:3003")
  .get("/graphql")
  .query(
    "query=query%20BlogPostAggregate%20%7B%20blogPostAggregate%20%7B%20groupBy%20%7B%20status%20%7D%20count%20%7B%20status%20%7D%20%7D%20%7D&operationName=BlogPostAggregate",
  )
  .reply(
    200,
    {
      data: {
        blogPostAggregate: [
          { groupBy: { status: "DRAFT" }, count: { status: 327 } },
          {
            groupBy: { status: "PUBLISHED" },
            count: { status: 330 },
          },
          { groupBy: { status: "REJECTED" }, count: { status: 341 } },
        ],
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
      "202",
      "ETag",
      'W/"ca-6w/o6KLhG7ECL6B1j+01HCRQ2WI"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003")
  .get("/graphql")
  .query(
    "query=query%20GetAllBlogPosts(%24sorting%3A%20%5BBlogPostSort!%5D%20%24filter%3A%20BlogPostFilter!%20%24paging%3A%20OffsetPaging!)%20%7B%20sorted%3A%20blogPosts(sorting%3A%20%24sorting%20paging%3A%20%24paging)%20%7B%20nodes%20%7B%20id%20title%20createdAt%20%7D%20%7D%20filtered%3A%20blogPosts(filter%3A%20%24filter)%20%7B%20nodes%20%7B%20id%20%7D%20%7D%20%7D&variables=%7B%22sorting%22%3A%5B%7B%22field%22%3A%22id%22%2C%22direction%22%3A%22ASC%22%7D%5D%2C%22filter%22%3A%7B%22id%22%3A%7B%22eq%22%3A1%7D%7D%2C%22paging%22%3A%7B%22limit%22%3A2%2C%22offset%22%3A0%7D%7D&operationName=GetAllBlogPosts",
  )
  .reply(
    200,
    {
      data: {
        sorted: {
          nodes: [
            {
              id: "1",
              title: "updated-foo-3asdadsasd",
              createdAt: "2023-08-08T08:40:24.554Z",
            },
            {
              id: "2",
              title: "updated-foo-2qwdqwdqwd",
              createdAt: "2023-08-08T08:40:24.558Z",
            },
          ],
        },
        filtered: { nodes: [{ id: "1" }] },
      },
    },
    [
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "232",
      "ETag",
      'W/"e8-BmQnXB76cWxgdpzFJzlbXG/5e40"',
      "Date",
      "Wed, 09 Aug 2023 09:59:49 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003")
  .get("/graphql")
  .query(
    "query=query%20%7B%20blogPostAggregate%20%7B%20groupBy%20%7B%20status%20%7D%20count%20%7B%20status%20%7D%20%7D%20%7D&variables=%7B%7D",
  )
  .reply(
    200,
    {
      data: {
        blogPostAggregate: [
          { groupBy: { status: "DRAFT" }, count: { status: 327 } },
          {
            groupBy: { status: "PUBLISHED" },
            count: { status: 330 },
          },
          { groupBy: { status: "REJECTED" }, count: { status: 341 } },
        ],
      },
    },
    [
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "232",
      "ETag",
      'W/"e8-BmQnXB76cWxgdpzFJzlbXG/5e40"',
      "Date",
      "Wed, 09 Aug 2023 09:59:49 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003")
  .get("/graphql")
  .query(
    "query=query%20GetAllBlogPosts(%20%24sorting%3A%20%5BBlogPostSort!%5D%20%24filter%3A%20BlogPostFilter!%20%24paging%3A%20OffsetPaging!%20)%20%7B%20sorted%3A%20blogPosts(sorting%3A%20%24sorting%20paging%3A%20%24paging)%20%7B%20nodes%20%7B%20id%20title%20createdAt%20%7D%20%7D%20filtered%3A%20blogPosts(filter%3A%20%24filter)%20%7B%20nodes%20%7B%20id%20%7D%20%7D%20%7D&variables=%7B%22sorting%22%3A%5B%7B%22field%22%3A%22id%22%2C%22direction%22%3A%22ASC%22%7D%5D%2C%22filter%22%3A%7B%22id%22%3A%7B%22eq%22%3A1%7D%7D%2C%22paging%22%3A%7B%22limit%22%3A2%2C%22offset%22%3A0%7D%7D&operationName=GetAllBlogPosts",
  )
  .reply(
    200,
    {
      data: {
        sorted: {
          nodes: [
            {
              id: "1",
              title: "updated-foo-3asdadsasd",
              createdAt: "2023-08-08T08:40:24.554Z",
            },
            {
              id: "2",
              title: "updated-foo-2qwdqwdqwd",
              createdAt: "2023-08-08T08:40:24.558Z",
            },
          ],
        },
        filtered: { nodes: [{ id: "1" }] },
      },
    },
    [
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "232",
      "ETag",
      'W/"e8-BmQnXB76cWxgdpzFJzlbXG/5e40"',
      "Date",
      "Wed, 09 Aug 2023 09:59:49 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3004")
  .get("/graphql")
  .query(
    "query=query%20BlogPostAggregate%20%7B%20blogPostAggregate%20%7B%20groupBy%20%7B%20status%20%7D%20count%20%7B%20status%20%7D%20%7D%20%7D&operationName=BlogPostAggregate",
  )
  .reply(
    200,
    {
      data: {
        blogPostAggregate: [
          { groupBy: { status: "DRAFT" }, count: { status: 327 } },
          {
            groupBy: { status: "PUBLISHED" },
            count: { status: 330 },
          },
          { groupBy: { status: "REJECTED" }, count: { status: 341 } },
        ],
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
      "202",
      "ETag",
      'W/"ca-6w/o6KLhG7ECL6B1j+01HCRQ2WI"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3004", {
  reqheaders: {
    "Custom-Header": (value) => value === "Custom-Header-Value",
    "Custom-Header-Before": (value) => value === "Custom-Header-Before",
  },
})
  .get("/graphql")
  .query(
    "query=query%20TestQuery%20%7B%20testAggregate%20%7B%20id%20%7D%20%7D&operationName=TestQuery",
  )
  .reply(
    200,
    {
      data: {
        testAggregate: {
          id: "lorem ipsum",
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
      "202",
      "ETag",
      'W/"ca-6w/o6KLhG7ECL6B1j+01HCRQ2WI"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3004", {
  reqheaders: {
    "Subsequent-Test": (value) => value === "Subsequent-Test",
  },
})
  .get("/graphql")
  .query(
    "query=query%20TestQuery%20%7B%20testAggregate%20%7B%20id%20%7D%20%7D&operationName=TestQuery",
  )
  .reply(
    200,
    {
      data: {
        testAggregate: {
          id: "lorem ipsum",
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
      "202",
      "ETag",
      'W/"ca-6w/o6KLhG7ECL6B1j+01HCRQ2WI"',
      "Date",
      "Tue, 08 Aug 2023 11:40:35 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:3003", {
  encodedQueryParams: true,
  reqheaders: {
    "Subsequent-Test": (value) => value === "Subsequent-Test",
  },
})
  .post("/graphql", {
    query:
      "query GetOneBlogPost($id: ID!) {\n  blogPost(id: $id) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      id: "1",
    },
    operationName: "GetOneBlogPost",
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "1",
          title: "updated-foo-2",
          content: "updated-bar-2",
          status: "PUBLISHED",
          category: { id: "3" },
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
      "126",
      "ETag",
      'W/"7e-Cl5he/nvkiuG9ZY19THgesoMW0g"',
      "Date",
      "Tue, 08 Aug 2023 11:40:36 GMT",
      "Connection",
      "close",
    ],
  );
