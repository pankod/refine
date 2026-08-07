import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query  { posts_aggregate  { aggregate  { count } } }",
    variables: {},
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e298e4f4c4f2f4a4d4f2c49050921380a560ad54ac9f9a5792520a69185716d6d6d2d000000ffff0300f6750d833c000000",
    ],
    [
      "Date",
      "Fri, 04 Aug 2023 08:38:38 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "d62083f656aad0b6f0ecae36298376f1",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "7f157c33ce7c92d8-IST",
      "Content-Encoding",
      "gzip",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query  { postsAggregate  { aggregate  { count } } }",
    variables: {},
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e29764c4f2f4a4d4f2c49058924c2390a560ad54ac9f9a5792520a69185716d6d6d2d000000ffff03004f9ee1aa3b000000",
    ],
    [
      "Date",
      "Fri, 04 Aug 2023 08:38:38 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "feb63c6f32afa1c2c707d902a7b1b0ea",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "7f157c392f7f548d-IST",
      "Content-Encoding",
      "gzip",
    ],
  );

// with gql correct response with hasura-default & gqlQuery
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost {\n  posts_aggregate {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {},
    operationName: "GetPost",
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e298e4f4c4f2f4a4d4f2c49050921380a560ad54ac9f9a5792520a6b1a1456d6d6d2d000000ffff03009b1ea5753c000000",
    ],
    [
      "Date",
      "Tue, 09 Jan 2024 11:11:51 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "024df2b3f31c080d24c6398fadef1cdf",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "842c3de61e9368b6-BUD",
      "Content-Encoding",
      "gzip",
    ],
  );

// with gql correct response with hasura-default & gqlMutation
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost {\n  posts_aggregate {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {},
    operationName: "GetPost",
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e298e4f4c4f2f4a4d4f2c49050921380a560ad54ac9f9a5792520a6b1a1456d6d6d2d000000ffff03009b1ea5753c000000",
    ],
    [
      "Date",
      "Tue, 09 Jan 2024 11:11:51 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "d93e9323c6814ef6133acb6daa7a5ebf",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "842c3dec1fa0c1b9-BUD",
      "Content-Encoding",
      "gzip",
    ],
  );

// with gql correct response with hasura-default & gqlQuery
nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost {\n  postsAggregate {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {},
    operationName: "GetPost",
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e29764c4f2f4a4d4f2c49058924c2390a560ad54ac9f9a5792520a6b1a1456d6d6d2d000000ffff030022f5495c3b000000",
    ],
    [
      "Date",
      "Tue, 09 Jan 2024 11:15:18 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "7efd756078b22e97c83ec8e72d2baf88",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "842c42f5fbee68bb-BUD",
      "Content-Encoding",
      "gzip",
    ],
  );

// with gql correct response with hasura-default & gqlMutation
nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost {\n  postsAggregate {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {},
    operationName: "GetPost",
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e29764c4f2f4a4d4f2c49058924c2390a560ad54ac9f9a5792520a6b1a1456d6d6d2d000000ffff030022f5495c3b000000",
    ],
    [
      "Date",
      "Tue, 09 Jan 2024 11:15:19 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "09ca174ac04544403a6304b59501a8ef",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "842c42f86deac1c1-BUD",
      "Content-Encoding",
      "gzip",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost($includeAvg: Boolean = false) {\n  posts_aggregate {\n    aggregate {\n      count\n      avg @include(if: $includeAvg) {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      includeAvg: true,
    },
    operationName: "GetPost",
  })
  .reply(
    200,
    {
      data: {
        posts_aggregate: {
          aggregate: {
            count: 318,
            avg: {
              id: 42,
            },
          },
        },
      },
    },
    [
      "Date",
      "Tue, 09 Jan 2024 11:15:20 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Connection",
      "close",
      "x-request-id",
      "7d98c24a10b32a6e7c1f5d9b8e4a2c1d",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "842c42fbb9f768bc-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost($includeAvg: Boolean = false) {\n  posts_aggregate {\n    aggregate {\n      count\n      avg @include(if: $includeAvg) {\n        id\n      }\n    }\n  }\n}\n",
    variables: {},
    operationName: "GetPost",
  })
  .reply(
    200,
    {
      data: {
        posts_aggregate: {
          aggregate: {
            count: 318,
          },
        },
      },
    },
    [
      "Date",
      "Tue, 09 Jan 2024 11:15:21 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Connection",
      "close",
      "x-request-id",
      "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "842c42fee9abc1c1-BUD",
    ],
  );
