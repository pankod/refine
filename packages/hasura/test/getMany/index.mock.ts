import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($where: posts_bool_exp) { posts (where: $where) { id, title, content, category { id } } }",
    variables: {
      where: {
        id: {
          _in: [
            "572708c7-840d-430a-befd-1416bdee799a",
            "478212ed-9a78-428c-b418-306bd88e0790",
          ],
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "572708c7-840d-430a-befd-1416bdee799a",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "478212ed-9a78-428c-b418-306bd88e0790",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:53 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "412",
      "Connection",
      "close",
      "x-request-id",
      "2edeb4dcb3e80b775bfbe82c3f3fc7e8",
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
      "843770a1bb76c1c8-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($where: PostsBoolExp) { posts (where: $where) { id, title, content, category { id } } }",
    variables: {
      where: {
        id: {
          _in: [
            "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            "ae316d48-025a-47db-b4c0-ff4694f52c85",
          ],
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:54 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "412",
      "Connection",
      "close",
      "x-request-id",
      "6dd165860aa3c106fd125c6d431b6847",
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
      "843770a919557340-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: posts_bool_exp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "572708c7-840d-430a-befd-1416bdee799a",
            "478212ed-9a78-428c-b418-306bd88e0790",
          ],
        },
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
            id: "572708c7-840d-430a-befd-1416bdee799a",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "478212ed-9a78-428c-b418-306bd88e0790",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:55 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "460",
      "Connection",
      "close",
      "x-request-id",
      "2675282c7701be1743c0672fed751840",
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
      "843770b02ebb7339-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: PostsBoolExp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            "ae316d48-025a-47db-b4c0-ff4694f52c85",
          ],
        },
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
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:56 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "459",
      "Connection",
      "close",
      "x-request-id",
      "ce9c0fa21bbec5cc3b01a12527bb7a78",
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
      "843770b74ad6c1a8-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: posts_bool_exp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "572708c7-840d-430a-befd-1416bdee799a",
            "478212ed-9a78-428c-b418-306bd88e0790",
          ],
        },
        content: { _neq: "Updated Content" },
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
            id: "478212ed-9a78-428c-b418-306bd88e0790",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Fri, 09 Aug 2024 16:09:02 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "277",
      "Connection",
      "keep-alive",
      "x-request-id",
      "812fdef57432b57197fc93e2408e6a19",
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
      "8b09021828a52ccb-DFW",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: posts_bool_exp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "7f690a87-db33-4a8f-b02d-e6d4a7241a9b",
            "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            "7af17f71-1ddf-4969-bcec-565f05b16098",
            "d52e6a60-dfd2-4b2c-b443-62b64b6b3aa0",
            "0ad3a15a-3191-4f44-910f-bd210deaa589",
          ],
        },
        title: { _ilike: "%updated%" },
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
            id: "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            title: "updated title3",
            content: "dasdasd",
            category: {
              id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
              title: "test category2",
            },
          },
          {
            id: "7af17f71-1ddf-4969-bcec-565f05b16098",
            title: "updated title3",
            content: "123123",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            content: "CREATED content23",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Fri, 09 Aug 2024 16:09:04 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "601",
      "Connection",
      "keep-alive",
      "x-request-id",
      "3af6dc8b919f84f6aa2dc61168fad780",
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
      "8b090221ea102ccb-DFW",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: posts_bool_exp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "203f94d4-396a-454c-a92e-947ec6bacb37",
            "294c278e-4e3d-4a40-88ee-208f47a42e7e",
            "2d2af5b8-70ed-46a3-873b-f79e92226c97",
            "1d7493ca-1401-48d3-9b92-d400fe0fbd16",
            "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            "3d71a408-ac30-41f2-b530-3fe951b16b86",
            "0b5e9ce1-e686-4ab6-909b-e51235f028a9",
            "1f85588c-7fc2-4223-b955-42909a7df4a8",
            "0ad3a15a-3191-4f44-910f-bd210deaa589",
            "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
          ],
        },
        _and: [
          { _not: { category: { title: { _eq: "ok" } } } },
          { title: { _ilike: "%updated%" } },
        ],
        _or: [
          { category_id: { _eq: "e27156c3-9998-434f-bd5b-2b078283ff26" } },
          { category_id: { _eq: "6869be25-7189-40a0-9e3c-12164c1929ec" } },
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
            id: "203f94d4-396a-454c-a92e-947ec6bacb37",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "294c278e-4e3d-4a40-88ee-208f47a42e7e",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "2d2af5b8-70ed-46a3-873b-f79e92226c97",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "1d7493ca-1401-48d3-9b92-d400fe0fbd16",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "3d71a408-ac30-41f2-b530-3fe951b16b86",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
            title: "Updated Title",
            content: "Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 7 } },
      },
    },
    [
      "Date",
      "Fri, 09 Aug 2024 16:09:05 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "keep-alive",
      "x-request-id",
      "70f2dbad1101c5fb5e870b73b4e10217",
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
      "8b0902288ecc2ccb-DFW",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: PostsBoolExp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "572708c7-840d-430a-befd-1416bdee799a",
            "478212ed-9a78-428c-b418-306bd88e0790",
          ],
        },
        content: { _neq: "Updated Content" },
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
            id: "478212ed-9a78-428c-b418-306bd88e0790",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 1 } },
      },
    },
    [
      "Date",
      "Fri, 09 Aug 2024 16:09:06 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "276",
      "Connection",
      "keep-alive",
      "x-request-id",
      "40b6d1a3b187b2b9f1c02f97d1b31453",
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
      "8b09022feb1146de-DFW",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: PostsBoolExp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "7f690a87-db33-4a8f-b02d-e6d4a7241a9b",
            "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            "7af17f71-1ddf-4969-bcec-565f05b16098",
            "d52e6a60-dfd2-4b2c-b443-62b64b6b3aa0",
            "0ad3a15a-3191-4f44-910f-bd210deaa589",
          ],
        },
        title: { _ilike: "%updated%" },
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
            id: "a4e83c6a-1fa1-4814-b8bc-82b249b3f6d9",
            title: "updated title3",
            content: "dasdasd",
            category: {
              id: "a08a1612-bee1-4e6f-b7d5-6fd40d7c3eb7",
              title: "test category2",
            },
          },
          {
            id: "7af17f71-1ddf-4969-bcec-565f05b16098",
            title: "updated title3",
            content: "123123",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title12345",
            content: "CREATED content23",
            category: {
              id: "0386c795-d8b2-40fd-b115-69ab60e7c098",
              title: "ok",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Fri, 09 Aug 2024 16:09:07 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "600",
      "Connection",
      "keep-alive",
      "x-request-id",
      "c9f943366b990460cca31a0d8b02a0e6",
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
      "8b0902376e9746de-DFW",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: PostsBoolExp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "203f94d4-396a-454c-a92e-947ec6bacb37",
            "294c278e-4e3d-4a40-88ee-208f47a42e7e",
            "2d2af5b8-70ed-46a3-873b-f79e92226c97",
            "1d7493ca-1401-48d3-9b92-d400fe0fbd16",
            "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            "3d71a408-ac30-41f2-b530-3fe951b16b86",
            "0b5e9ce1-e686-4ab6-909b-e51235f028a9",
            "1f85588c-7fc2-4223-b955-42909a7df4a8",
            "0ad3a15a-3191-4f44-910f-bd210deaa589",
            "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
          ],
        },
        _and: [
          { _not: { category: { title: { _eq: "ok" } } } },
          { title: { _ilike: "%updated%" } },
        ],
        _or: [
          { categoryId: { _eq: "e27156c3-9998-434f-bd5b-2b078283ff26" } },
          { categoryId: { _eq: "6869be25-7189-40a0-9e3c-12164c1929ec" } },
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
            id: "203f94d4-396a-454c-a92e-947ec6bacb37",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "294c278e-4e3d-4a40-88ee-208f47a42e7e",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "2d2af5b8-70ed-46a3-873b-f79e92226c97",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "1d7493ca-1401-48d3-9b92-d400fe0fbd16",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "3d71a408-ac30-41f2-b530-3fe951b16b86",
            title: "Multiple Updated Title",
            content: "Multiple Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
          {
            id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
            title: "Updated Title",
            content: "Updated Content",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              title: "lorem1 integer tincidunty",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 7 } },
      },
    },
    [
      "Date",
      "Fri, 09 Aug 2024 16:09:08 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "keep-alive",
      "x-request-id",
      "18881600c8c1f927074ee8f6ebe748cb",
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
      "8b09023edb2946de-DFW",
    ],
  );
