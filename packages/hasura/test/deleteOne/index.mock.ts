import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: uuid!) {\n      delete_posts_by_pk (id: $id) {\n    id, title\n  }\n    }",
    variables: { id: "25c94041-84c8-4e8f-9fb4-ea5453bf53e6" },
  })
  .reply(
    200,
    {
      data: {
        delete_posts_by_pk: {
          id: "25c94041-84c8-4e8f-9fb4-ea5453bf53e6",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:15 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "137",
      "Connection",
      "close",
      "x-request-id",
      "de336ce3d4a972b2568e0903e9eb5858",
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
      "84375843de10733c-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: Int!) {\n      delete_users_by_pk (id: $id) {\n    id, name\n  }\n    }",
    variables: { id: 1 },
  })
  .reply(200, { data: { delete_users_by_pk: { id: 1, name: "test" } } }, [
    "Date",
    "Wed, 10 Jan 2024 19:32:16 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "36",
    "Connection",
    "close",
    "x-request-id",
    "07bf6e1d22a9efa718942de7d959b1ef",
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
    "8437584cfe24733b-BUD",
  ]);

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: uuid!) {\n      delete_posts_by_pk (id: $id) {\n    id\n  }\n    }",
    variables: { id: "8bdbb0f5-f99b-4c80-808a-3ef64d52559b" },
  })
  .reply(
    200,
    {
      data: {
        delete_posts_by_pk: {
          id: "8bdbb0f5-f99b-4c80-808a-3ef64d52559b",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:17 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "77",
      "Connection",
      "close",
      "x-request-id",
      "dd8864ccb3a9b64c078aff0de3464546",
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
      "84375855c81868b0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: uuid!) {\n      deletePostsByPk (id: $id) {\n    id, title\n  }\n    }",
    variables: { id: "acab1eff-1b2d-4abb-9f0d-c2490f576850" },
  })
  .reply(
    200,
    {
      data: {
        deletePostsByPk: {
          id: "acab1eff-1b2d-4abb-9f0d-c2490f576850",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:19 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "134",
      "Connection",
      "close",
      "x-request-id",
      "dd5bdcc323bde48dc7869ef985b6776e",
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
      "8437585ad9951cfa-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: Int!) {\n      deleteUsersByPk (id: $id) {\n    id, name\n  }\n    }",
    variables: { id: 1 },
  })
  .reply(200, { data: { deleteUsersByPk: { id: 1, name: "test" } } }, [
    "Date",
    "Wed, 10 Jan 2024 19:32:20 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "33",
    "Connection",
    "close",
    "x-request-id",
    "252666f9f7b8a4f8aeb2dc1aaedb3ee1",
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
    "8437586469f41cfa-BUD",
  ]);

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: uuid!) {\n      deletePostsByPk (id: $id) {\n    id\n  }\n    }",
    variables: { id: "f1dc4055c-f31e-42df-b72d-c7a3a2936e51" },
  })
  .reply(
    200,
    {
      data: {
        deletePostsByPk: {
          id: "f1dc4055c-f31e-42df-b72d-c7a3a2936e51",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:21 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "154",
      "Connection",
      "close",
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
      "8437586e1a52c1c1-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeletePost($id: uuid!) {\n  delete_posts_by_pk(id: $id) {\n    id\n    title\n  }\n}\n",
    variables: { id: "5a7e0232-c581-4fbb-81ff-bf768c74d662" },
    operationName: "DeletePost",
  })
  .reply(
    200,
    {
      data: {
        delete_posts_by_pk: {
          id: "5a7e0232-c581-4fbb-81ff-bf768c74d662",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:22 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "137",
      "Connection",
      "close",
      "x-request-id",
      "6a34fe9e8dbf0bd1f60f43bd83bdca63",
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
      "84375873580e1cea-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeletePost($id: uuid!) {\n  deletePostsByPk(id: $id) {\n    id\n    title\n  }\n}\n",
    variables: { id: "2efdc1fe-658d-4379-bbfd-76f013d1df98" },
    operationName: "DeletePost",
  })
  .reply(
    200,
    {
      data: {
        deletePostsByPk: {
          id: "2efdc1fe-658d-4379-bbfd-76f013d1df98",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:22 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "165",
      "Connection",
      "close",
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
      "843758777a981cd0-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: uuid!) {\n      delete_posts_by_pk (id: $id) {\n    id\n  }\n    }",
    variables: { id: "39ddbca5-cd14-49fc-b88a-1925d808d310" },
  })
  .reply(
    200,
    {
      data: {
        delete_posts_by_pk: {
          id: "39ddbca5-cd14-49fc-b88a-1925d808d310",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:23 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "77",
      "Connection",
      "close",
      "x-request-id",
      "28c9cac50f6279466efbe3ab4ab4cbd2",
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
      "843758791c8e733d-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($id: uuid!) {\n      deletePostsByPk (id: $id) {\n    id\n  }\n    }",
    variables: { id: "1e1dc4c8-c9fa-46b7-924e-0995c33fdb10" },
  })
  .reply(
    200,
    {
      data: {
        deletePostsByPk: { id: "1e1dc4c8-c9fa-46b7-924e-0995c33fdb10" },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:23 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "74",
      "Connection",
      "close",
      "x-request-id",
      "6d106f1d013145fe750b324edc57ea0c",
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
      "8437587e1f6a733a-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeletePost($id: uuid!, $includeTitle: Boolean = false) {\n  delete_posts_by_pk(id: $id) {\n    id\n    title @include(if: $includeTitle)\n  }\n}\n",
    variables: {
      id: "9a83b4c2-5d1e-47f6-b9c5-3a2d8e1f0c7b",
      includeTitle: true,
    },
    operationName: "DeletePost",
  })
  .reply(
    200,
    {
      data: {
        delete_posts_by_pk: {
          id: "9a83b4c2-5d1e-47f6-b9c5-3a2d8e1f0c7b",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:24 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "137",
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
      "84375883ac84684c-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeletePost($id: uuid!, $includeTitle: Boolean = false) {\n  delete_posts_by_pk(id: $id) {\n    id\n    title @include(if: $includeTitle)\n  }\n}\n",
    variables: {
      id: "7b5c8a2d-6e9f-4a1b-8c3d-2e0f5a9b4c7d",
    },
    operationName: "DeletePost",
  })
  .reply(
    200,
    {
      data: {
        delete_posts_by_pk: {
          id: "7b5c8a2d-6e9f-4a1b-8c3d-2e0f5a9b4c7d",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:32:25 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "77",
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
      "8437588b1d56733a-BUD",
    ],
  );
