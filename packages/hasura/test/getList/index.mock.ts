import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0 },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
          },
          {
            id: "20b3d4ab-80a0-4a9e-9080-b934c15f0a4d",
            title: "Lorem ipsum dolore",
          },
          {
            id: "3a62d79b-147d-4228-a494-42b87f0fa069",
            title: "Lorem ipsum dolore",
          },
          {
            id: "1e13f5b2-9fd9-413c-9017-c472c4dabcc9",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "b55402d1-5a28-4dd4-9d3d-a679935a2d68",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "bae22655-73ed-4de6-a8c5-d8c2212e896f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "865fc5b1-be18-47ab-9ab1-802900504b66",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
        ],
        posts_aggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:07 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "10469d6a279f029bf6c2550c8a4b0726",
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
      "84380dba8b6fc1c1-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0, order_by: { id: "asc" } },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "00c688e2-a1bd-40dd-9f58-1e41d53386d2",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "01b0b68b-3cb7-4ba7-a176-9387d5ea3ef4",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "05eea4a6-5854-407c-af9d-614523a2342c",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "06b353b2-a807-4e47-a31d-8a158b7615ad",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "080c7c2e-8f71-476b-8d8a-7b15c859cf9a",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "08884710-eb2f-43b3-a4b8-9772527d3170",
            title: "Lorem ipsum dolore",
          },
          {
            id: "093728df-2cd5-486b-bccd-f1718c930967",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "09ec5ae3-6bb6-43d6-8612-1224d043d276",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0a0f1ef8-37f5-4b10-8fe5-a9d2f19a3b6f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title1234",
          },
        ],
        posts_aggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:08 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "586a5c610b5805ebc5f5cc8c172bbb6c",
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
      "84380dc118c9c1cd-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            category_id: {
              _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:09 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "317",
      "Connection",
      "close",
      "x-request-id",
      "866683ac19a30cdb73f4f4f51d76e43d",
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
      "84380dc81fb01ccc-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            category: {
              id: { _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264" },
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:09 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "317",
      "Connection",
      "close",
      "x-request-id",
      "ee9c6bd367105a6306d213d8a0ac05bc",
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
      "84380dcaaeea1ce0-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by, where: $where) { id, title, category { id, title } } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { title: "asc" },
      where: {
        _and: [
          {
            category_id: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:10 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "550",
      "Connection",
      "close",
      "x-request-id",
      "25d55a5af8b17cc1f3db39e176d075a2",
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
      "84380dcd3ae41ce0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0 },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
          },
          {
            id: "20b3d4ab-80a0-4a9e-9080-b934c15f0a4d",
            title: "Lorem ipsum dolore",
          },
          {
            id: "3a62d79b-147d-4228-a494-42b87f0fa069",
            title: "Lorem ipsum dolore",
          },
          {
            id: "1e13f5b2-9fd9-413c-9017-c472c4dabcc9",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "b55402d1-5a28-4dd4-9d3d-a679935a2d68",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "bae22655-73ed-4de6-a8c5-d8c2212e896f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "865fc5b1-be18-47ab-9ab1-802900504b66",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
        ],
        postsAggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:11 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "0ebb2b0e92812628fa7d849717fa6905",
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
      "84380dcfbfec1ce0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, orderBy: $orderBy) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0, orderBy: { id: "ASC" } },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "00c688e2-a1bd-40dd-9f58-1e41d53386d2",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "01b0b68b-3cb7-4ba7-a176-9387d5ea3ef4",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "05eea4a6-5854-407c-af9d-614523a2342c",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "06b353b2-a807-4e47-a31d-8a158b7615ad",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "080c7c2e-8f71-476b-8d8a-7b15c859cf9a",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "08884710-eb2f-43b3-a4b8-9772527d3170",
            title: "Lorem ipsum dolore",
          },
          {
            id: "093728df-2cd5-486b-bccd-f1718c930967",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "09ec5ae3-6bb6-43d6-8612-1224d043d276",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0a0f1ef8-37f5-4b10-8fe5-a9d2f19a3b6f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title1234",
          },
        ],
        postsAggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:12 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "75af8cd9febf1fda4879417ed11a7289",
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
      "84380dd70c6268bc-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            categoryId: {
              _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:12 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "316",
      "Connection",
      "close",
      "x-request-id",
      "ac650265692a3f233ed0af33fc235dc4",
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
      "84380dde4eb0c1cd-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            category: {
              id: { _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264" },
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:13 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "316",
      "Connection",
      "close",
      "x-request-id",
      "7c71308017014e25eed1eb2c69353d3b",
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
      "84380de0ee14c1be-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, orderBy: $orderBy, where: $where) { id, title, category { id, title } } postsAggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { title: "ASC" },
      where: {
        _and: [
          {
            categoryId: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:13 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "549",
      "Connection",
      "close",
      "x-request-id",
      "c607b18bbacd8aa52972395665f28b66",
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
      "84380de3bef36852-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { title: "asc" },
      where: {
        _and: [
          {
            category_id: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            category_id: "6869be25-7189-40a0-9e3c-12164c1929ec",
            created_at: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            category_id: "6869be25-7189-40a0-9e3c-12164c1929ec",
            created_at: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            category_id: "6869be25-7189-40a0-9e3c-12164c1929ec",
            created_at: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:14 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "57d5088254f2d322e56fdcc3efc648fd",
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
      "84380de68d7c1cd4-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) {\n  posts(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    title\n    categoryId\n    createdAt\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { title: "ASC" },
      where: {
        _and: [
          {
            categoryId: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            categoryId: "6869be25-7189-40a0-9e3c-12164c1929ec",
            createdAt: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            categoryId: "6869be25-7189-40a0-9e3c-12164c1929ec",
            createdAt: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            categoryId: "6869be25-7189-40a0-9e3c-12164c1929ec",
            createdAt: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:14 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "0c0cdf4b92314d901ba76c37799e8edb",
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
      "84380de90e9e1cd0-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        content: { _ilike: "updated%" },
        _or: [
          { title: { _ilike: "Etiam tincidunt ex ut auctor faucibus" } },
          { title: { _ilike: "%Updated%" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2024-01-10T19:45:30.879255+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "9efe1ab9-bd9c-4057-8a76-98d329c1518f",
            title: "Etiam tincidunt ex ut auctor faucibus",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2023-08-04T08:26:30.134135+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "4ef4ba41-92d5-4d1f-b1a5-fc91c9a08284",
            title: "Multiple Updated Title",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2023-08-04T08:25:17.281437+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "572708c7-840d-430a-befd-1416bdee799a",
            title: "Updated Title",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2024-01-10T19:45:27.810216+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "881a45fd-a5da-46f4-a045-58eeb647862f",
            title: "Etiam tincidunt ex ut auctor faucibus",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2024-01-10T21:04:24.862392+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
            title: "Updated Title",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2024-01-10T19:45:29.357149+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 8 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:29 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "keep-alive",
      "x-request-id",
      "c481d193d13ea6a2d46351c0ab1232a9",
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
      "8b15fd029bfbc2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          { content: { _ilike: "updated%" } },
          { category: { title: { _eq: "aaaaaaaaaarhoncus" } } },
        ],
        _or: [
          { title: { _ilike: "Etiam tincidunt ex ut auctor faucibus" } },
          { title: { _ilike: "%Updated%" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:30 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "581",
      "Connection",
      "keep-alive",
      "x-request-id",
      "31f578daef6ca27f50ac919f77c3ce67",
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
      "8b15fd09ed41c2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          { content: { _ilike: "updated%" } },
          { category: { title: { _eq: "aaaaaaaaaarhoncus" } } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
          {
            id: "9cd924d2-de3b-479a-9882-23feeb0fd80f",
            title: "habitasse platea dictumst aliquam",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:30 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "keep-alive",
      "x-request-id",
      "8bed9d7de2613bf5a291f22130fd232e",
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
      "8b15fd104a0dc2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          { category: { title: { _eq: "aaaaaaaaaarhoncus" } } },
          { created_at: { _gte: "2023-06-07T06:13:57.996223+00:00" } },
          { title: { _ilike: "%test%" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "fcaa6d74-ef59-41af-954b-50defdb78d30",
            title: "Test Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-06-07T06:13:57.996223+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:31 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "321",
      "Connection",
      "keep-alive",
      "x-request-id",
      "cd8bde5c248b6b0a37cf7c9783b4a754",
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
      "8b15fd12ca32c2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          { created_at: { _gte: "2023-06-07T06:13:57.996223+00:00" } },
          { content: { _eq: "Updated Content" } },
          { category: { title: { _eq: "aaaaaaaaaarhoncus" } } },
          { title: { _ilike: "%updated%" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
            category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            created_at: "2023-08-04T08:24:53.471186+00:00",
            category: {
              id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
              title: "aaaaaaaaaarhoncus",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:31 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "581",
      "Connection",
      "keep-alive",
      "x-request-id",
      "24af4e061ed058f6fe66349eb1677313",
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
      "8b15fd15598dc2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          { created_at: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
          { category: { title: { _eq: "turpis adipiscing lorem 123" } } },
          { title: { _ilike: "%Updated%" } },
          { title: { _ilike: "%3%" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            category_id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:32 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "335",
      "Connection",
      "keep-alive",
      "x-request-id",
      "28138dad035b154e7dea8e00d7b9c790",
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
      "8b15fd19de5ac2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          {
            _not: {
              category_id: { _eq: "ff454a95-d2d4-45b2-9eed-506c9d0fc282" },
            },
          },
          { created_at: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "7f690a87-db33-4a8f-b02d-e6d4a7241a9b",
            title: "123",
            category_id: "adfd9627-9a4d-4bef-8ded-a927c800804d",
            created_at: "2024-01-08T11:19:58.060476+00:00",
            category: {
              id: "adfd9627-9a4d-4bef-8ded-a927c800804d",
              title: "HK",
            },
          },
          {
            id: "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            title: "updated title3",
            category_id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
            created_at: "2023-11-04T05:22:02.513672+00:00",
            category: {
              id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
              title: "test category2",
            },
          },
          {
            id: "7af17f71-1ddf-4969-bcec-565f05b16098",
            title: "updated title3",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2024-01-04T12:19:46.663453+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "d52e6a60-dfd2-4b2c-b443-62b64b6b3aa0",
            title: "123",
            category_id: "0ea181ad-dd28-4844-bfc6-fd278e46710d",
            created_at: "2024-01-08T14:48:58.190456+00:00",
            category: {
              id: "0ea181ad-dd28-4844-bfc6-fd278e46710d",
              title: "vulputate elementum nullam 222",
            },
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            category_id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 5 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:33 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "keep-alive",
      "x-request-id",
      "aa95efe0b53898a46ef087b3276d49d5",
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
      "8b15fd1cbf4bc2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { title: "asc" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { title: { _ilike: "%Updated%" } },
          { created_at: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            category_id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            category_id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:33 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "582",
      "Connection",
      "keep-alive",
      "x-request-id",
      "78ad56737027956f1bf8d1119421ba59",
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
      "8b15fd236ce7c2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { title: "asc" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { _not: { category: { title: { _eq: "ok" } } } },
          { title: { _ilike: "%Updated%" } },
          { created_at: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            category_id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:34 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "335",
      "Connection",
      "keep-alive",
      "x-request-id",
      "5598e52a8424e79f2ebac21a0f8b9122",
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
      "8b15fd25cd1bc2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { title: "asc" },
      where: {
        _and: [
          { _not: { category: { title: { _eq: "ok" } } } },
          { title: { _ilike: "%Updated%" } },
          { title: { _ilike: "%3%" } },
          { created_at: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            category_id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:35 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "335",
      "Connection",
      "keep-alive",
      "x-request-id",
      "1ff032afd969c8a9aaac8e382cd47221",
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
      "8b15fd2d5e41c2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { id: "desc" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { title: { _ilike: "%Updated%" } },
          { created_at: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            category_id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            category_id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
            created_at: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:35 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "582",
      "Connection",
      "keep-alive",
      "x-request-id",
      "4d4547a62ef90a72f7f44849ba400b3f",
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
      "8b15fd2fee75c2f1-IAH",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { id: "asc" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { _not: { category: { title: { _eq: "ok" } } } },
          {
            _not: {
              category_id: { _eq: "ff454a95-d2d4-45b2-9eed-506c9d0fc282" },
            },
          },
          { created_at: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "7af17f71-1ddf-4969-bcec-565f05b16098",
            title: "updated title3",
            category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            created_at: "2024-01-04T12:19:46.663453+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "7f690a87-db33-4a8f-b02d-e6d4a7241a9b",
            title: "123",
            category_id: "adfd9627-9a4d-4bef-8ded-a927c800804d",
            created_at: "2024-01-08T11:19:58.060476+00:00",
            category: {
              id: "adfd9627-9a4d-4bef-8ded-a927c800804d",
              title: "HK",
            },
          },
          {
            id: "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            title: "updated title3",
            category_id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
            created_at: "2023-11-04T05:22:02.513672+00:00",
            category: {
              id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
              title: "test category2",
            },
          },
          {
            id: "d52e6a60-dfd2-4b2c-b443-62b64b6b3aa0",
            title: "123",
            category_id: "0ea181ad-dd28-4844-bfc6-fd278e46710d",
            created_at: "2024-01-08T14:48:58.190456+00:00",
            category: {
              id: "0ea181ad-dd28-4844-bfc6-fd278e46710d",
              title: "vulputate elementum nullam 222",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 4 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:36 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "keep-alive",
      "x-request-id",
      "688630a594c200adccd99413d485bcd8",
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
      "8b15fd32c812c2f1-IAH",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) {\n  posts(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    title\n    categoryId\n    createdAt\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { title: "ASC" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { title: { _ilike: "%Updated%" } },
          { createdAt: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            categoryId: "0386c795-d8b2-40fd-b115-69ab60e7c098",
            createdAt: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            categoryId: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            createdAt: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:37 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "577",
      "Connection",
      "keep-alive",
      "x-request-id",
      "e3153b0fbce5a3c169830748befb80ff",
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
      "8b15fd35ea3416d1-IAH",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) {\n  posts(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    title\n    categoryId\n    createdAt\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { title: "ASC" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { _not: { category: { title: { _eq: "ok" } } } },
          { title: { _ilike: "%Updated%" } },
          { createdAt: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            categoryId: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            createdAt: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:37 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "332",
      "Connection",
      "keep-alive",
      "x-request-id",
      "f88b47fd6877e5a9050afb04145ef24a",
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
      "8b15fd3dac4916d1-IAH",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) {\n  posts(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    title\n    categoryId\n    createdAt\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { title: "ASC" },
      where: {
        _and: [
          { _not: { category: { title: { _eq: "ok" } } } },
          { title: { _ilike: "%Updated%" } },
          { title: { _ilike: "%3%" } },
          { createdAt: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            categoryId: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            createdAt: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:39 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "332",
      "Connection",
      "keep-alive",
      "x-request-id",
      "107c3e7049c48c16812ff16588215550",
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
      "8b15fd409fc316d1-IAH",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) {\n  posts(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    title\n    categoryId\n    createdAt\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { id: "DESC" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { title: { _ilike: "%Updated%" } },
          { createdAt: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
        _or: [
          { content: { _eq: "CREATED content23" } },
          { content: { _eq: "CREATED content1" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "1f85588c-7fc2-4223-b955-42909a7df4a8",
            title: "updated title3",
            categoryId: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
            createdAt: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "ff454a95-d2d4-45b2-9eed-506c9d0fc282",
              title: "turpis adipiscing lorem 123",
            },
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            categoryId: "0386c795-d8b2-40fd-b115-69ab60e7c098",
            createdAt: "2024-01-09T07:20:02.573986+00:00",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:39 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "577",
      "Connection",
      "keep-alive",
      "x-request-id",
      "4b3671a9fc5b4259e528ee651a84c8dc",
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
      "8b15fd484ab816d1-IAH",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) {\n  posts(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    title\n    categoryId\n    createdAt\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { id: "ASC" },
      where: {
        _and: [
          { title: { _ilike: "%3%" } },
          { _not: { category: { title: { _eq: "ok" } } } },
          {
            _not: {
              categoryId: { _eq: "ff454a95-d2d4-45b2-9eed-506c9d0fc282" },
            },
          },
          { createdAt: { _gte: "2023-08-04T08:26:26.489116+00:00" } },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "7af17f71-1ddf-4969-bcec-565f05b16098",
            title: "updated title3",
            categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
            createdAt: "2024-01-04T12:19:46.663453+00:00",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "7f690a87-db33-4a8f-b02d-e6d4a7241a9b",
            title: "123",
            categoryId: "adfd9627-9a4d-4bef-8ded-a927c800804d",
            createdAt: "2024-01-08T11:19:58.060476+00:00",
            category: {
              id: "adfd9627-9a4d-4bef-8ded-a927c800804d",
              title: "HK",
            },
          },
          {
            id: "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            title: "updated title3",
            categoryId: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
            createdAt: "2023-11-04T05:22:02.513672+00:00",
            category: {
              id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
              title: "test category2",
            },
          },
          {
            id: "d52e6a60-dfd2-4b2c-b443-62b64b6b3aa0",
            title: "123",
            categoryId: "0ea181ad-dd28-4844-bfc6-fd278e46710d",
            createdAt: "2024-01-08T14:48:58.190456+00:00",
            category: {
              id: "0ea181ad-dd28-4844-bfc6-fd278e46710d",
              title: "vulputate elementum nullam 222",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 4 } },
      },
    },
    [
      "Date",
      "Sun, 11 Aug 2024 05:57:40 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "keep-alive",
      "x-request-id",
      "50d7566bd7b6a34908327e9be6e6dd01",
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
      "8b15fd4b1fa116d1-IAH",
    ],
  );
