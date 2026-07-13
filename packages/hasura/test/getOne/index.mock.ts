import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($id: uuid!) { posts_by_pk (id: $id) { id, title, content, category { id } } }",
    variables: { id: "572708c7-840d-430a-befd-1416bdee799a" },
  })
  .reply(
    200,
    {
      data: {
        posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:48 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "233",
      "Connection",
      "close",
      "x-request-id",
      "fd387e1011be5b8938bf10cc2fed3e6b",
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
      "84377f2e1e64684d-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query ($id: Int!) { users_by_pk (id: $id) { id, name, email } }",
    variables: { id: 1 },
  })
  .reply(
    200,
    {
      data: {
        users_by_pk: {
          id: 1,
          name: "Refine",
          email: "mail@refine.dev",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:49 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "29",
      "Connection",
      "close",
      "x-request-id",
      "ef73085a8c8e2e4c1c84a73739bde342",
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
      "84377f34dd82733a-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query ($id: Int!) { users_by_pk (id: $id) { id, name, email } }",
    variables: { id: 1 },
  })
  .reply(
    200,
    {
      data: {
        users_by_pk: {
          id: 1,
          name: "Refine",
          email: "mail@refine.dev",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:50 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "29",
      "Connection",
      "close",
      "x-request-id",
      "8dd49134c35145f3b517453380508b33",
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
      "84377f3b8f2168ad-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($id: uuid!) { postsByPk (id: $id) { id, title, content, category { id } } }",
    variables: { id: "4ec22cb3-b679-4891-a489-3d19cf275ab3" },
  })
  .reply(
    200,
    {
      data: {
        postsByPk: {
          id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:51 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "231",
      "Connection",
      "close",
      "x-request-id",
      "cac641306512f19affa0547415cefe36",
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
      "84377f3deb23c1be-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query ($id: Int!) { usersByPk (id: $id) { id, name, email } }",
    variables: { id: 1 },
  })
  .reply(
    200,
    {
      data: {
        usersByPk: { id: 1, name: "Refine", email: "mail@refine.dev" },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:52 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "27",
      "Connection",
      "close",
      "x-request-id",
      "07c6f99856e898226a2d94f8b6e0c7c7",
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
      "84377f451fa4733a-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query ($id: Int!) { usersByPk (id: $id) { id, name, email } }",
    variables: { id: 1 },
  })
  .reply(
    200,
    {
      data: {
        usersByPk: { id: 1, name: "Refine", email: "mail@refine.dev" },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:52 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "27",
      "Connection",
      "close",
      "x-request-id",
      "c2d8d8b8f374f0878f402b699ea32987",
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
      "84377f4bfdcbc1be-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query ($id: Int!) { users_by_pk (id: $id) { id, name, email } }",
    variables: { id: 1 },
  })
  .reply(
    200,
    {
      data: {
        users_by_pk: {
          id: 1,
          name: "Refine",
          email: "mail@refine.dev",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:12:06 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "29",
      "Connection",
      "close",
      "x-request-id",
      "35dba2b8a27dc0aa96f164b952183f10",
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
      "843792a66c7cc1c1-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($id: uuid!) { posts_by_pk (id: $id) { id, title, content, category { id } } }",
    variables: { id: "572708c7-840d-430a-befd-1416bdee799a" },
  })
  .reply(
    200,
    {
      data: {
        posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:12:07 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "233",
      "Connection",
      "close",
      "x-request-id",
      "7f88afed80a752f54c9062f27857b6db",
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
      "843792ad8e30c1bc-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query: "query ($id: Int!) { usersByPk (id: $id) { id, name, email } }",
    variables: { id: 1 },
  })
  .reply(
    200,
    {
      data: {
        usersByPk: { id: 1, name: "Refine", email: "mail@refine.dev" },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:12:08 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "27",
      "Connection",
      "close",
      "x-request-id",
      "a58d38d3305def0afb13011ca014af8d",
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
      "843792b4d80b6850-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($id: uuid!) { postsByPk (id: $id) { id, title, content, category { id } } }",
    variables: { id: "4ec22cb3-b679-4891-a489-3d19cf275ab3" },
  })
  .reply(
    200,
    {
      data: {
        postsByPk: {
          id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:12:09 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "231",
      "Connection",
      "close",
      "x-request-id",
      "255799c61286cce663871caf84e5a1e7",
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
      "843792bbfd7cc1b9-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost($id: uuid!) {\n  posts_by_pk(id: $id) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: { id: "572708c7-840d-430a-befd-1416bdee799a", foo: "bar" },
    operationName: "GetPost",
  })
  .reply(
    200,
    {
      data: {
        posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:53 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "233",
      "Connection",
      "close",
      "x-request-id",
      "d04626b05e47d483225daf00d5d84e30",
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
      "84377f4e5974684a-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPost($id: uuid!) {\n  posts_by_pk(id: $id) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: { id: "572708c7-840d-430a-befd-1416bdee799a", foo: "bar" },
    operationName: "GetPost",
  })
  .reply(
    200,
    {
      data: {
        posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:53 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "233",
      "Connection",
      "close",
      "x-request-id",
      "cc6432f4078f5bcc20bf876e0acc1e34",
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
      "84377f50ecdb68b0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetUser($id: Int!) {\n  usersByPk(id: $id) {\n    id\n    name\n    email\n  }\n}\n",
    variables: { id: 1 },
    operationName: "GetUser",
  })
  .reply(
    200,
    {
      data: {
        usersByPk: { id: 1, name: "Refine", email: "mail@refine.dev" },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:54 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "27",
      "Connection",
      "close",
      "x-request-id",
      "d86af70d4145e223f0c4d53f2e2f7a2b",
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
      "84377f52f8001cbc-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetUser($id: Int!) {\n  usersByPk(id: $id) {\n    id\n    name\n    email\n  }\n}\n",
    variables: { id: 1 },
    operationName: "GetUser",
  })
  .reply(
    200,
    {
      data: {
        usersByPk: { id: 1, name: "Refine", email: "mail@refine.dev" },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:58:54 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "27",
      "Connection",
      "close",
      "x-request-id",
      "d88e44f15597b5fed71a588016cddfb2",
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
      "84377f554b5dc1b9-BUD",
    ],
  );
