import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: posts_bool_exp!) {\n  delete_posts(where: $where) {\n    returning {\n      id\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "7b173e43-1a37-4099-a98c-efc4bdc256d9",
            "9786b4bd-9762-4039-90da-8d572e8c013b",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        delete_posts: {
          returning: [
            {
              id: "7b173e43-1a37-4099-a98c-efc4bdc256d9",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "9786b4bd-9762-4039-90da-8d572e8c013b",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:29 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "244",
      "Connection",
      "close",
      "x-request-id",
      "a6abb90da9588fa0e4a73e580b38de97",
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
      "84374ce6bbacc1a8-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: posts_bool_exp!) {\n  delete_posts(where: $where) {\n    returning {\n      id\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "74637d48-acb3-4345-96d3-b0b5d7803287",
            "376e9618-6631-4ae0-9026-bcf85f8c1a6a",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        delete_posts: {
          returning: [
            { id: "74637d48-acb3-4345-96d3-b0b5d7803287" },
            { id: "376e9618-6631-4ae0-9026-bcf85f8c1a6a" },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:31 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "136",
      "Connection",
      "close",
      "x-request-id",
      "5d030dc04f1b52ad0e81b315c8a5d729",
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
      "84374cefdca36852-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: PostsBoolExp!) {\n  deletePosts(where: $where) {\n    returning {\n      id\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "7d026623-a2fe-4559-8368-b81debbdcc87",
            "74c8e223-69e5-4226-8355-387e82256110",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        deletePosts: {
          returning: [
            {
              id: "7d026623-a2fe-4559-8368-b81debbdcc87",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "74c8e223-69e5-4226-8355-387e82256110",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:32 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "243",
      "Connection",
      "close",
      "x-request-id",
      "ad27c95560201497560927d98736a05f",
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
      "84374cf88975c1b7-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: PostsBoolExp!) {\n  deletePosts(where: $where) {\n    returning {\n      id\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "a3be942e-cd37-4b26-9306-4b5d2c790fe2",
            "b03a2456-ce22-4580-8539-45f07567db7c",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        deletePosts: {
          returning: [
            { id: "a3be942e-cd37-4b26-9306-4b5d2c790fe2" },
            { id: "b03a2456-ce22-4580-8539-45f07567db7c" },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:33 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "135",
      "Connection",
      "close",
      "x-request-id",
      "2a431ea047de5aa3ed017d90790eb816",
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
      "84374d02880f684d-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: posts_bool_exp!) {\n  delete_posts(where: $where) {\n    returning {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "a6da5ec4-3900-4da0-ac13-bafeef14e083",
            "f8b4855a-f372-4551-b9fd-e3d30fd98f49",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        delete_posts: {
          returning: [
            {
              id: "a6da5ec4-3900-4da0-ac13-bafeef14e083",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "f8b4855a-f372-4551-b9fd-e3d30fd98f49",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:34 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "244",
      "Connection",
      "close",
      "x-request-id",
      "39dedd27de90771df88477593a62f4ef",
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
      "84374d077c9468b0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: PostsBoolExp!) {\n  deletePosts(where: $where) {\n    returning {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "926812ce-7f70-487a-8026-51c8404456f7",
            "5c48097a-ba80-45cf-afe9-b59d279277d0",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        deletePosts: {
          returning: [
            {
              id: "926812ce-7f70-487a-8026-51c8404456f7",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "5c48097a-ba80-45cf-afe9-b59d279277d0",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:36 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "243",
      "Connection",
      "close",
      "x-request-id",
      "8eebea622392b43a97f109b9c3ab9e0e",
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
      "84374d0c4fe2733a-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: posts_bool_exp!) {\n  delete_posts(where: $where) {\n    returning {\n      id\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "a6da5ec4-3900-4da0-ac13-bafeef14e083",
            "f8b4855a-f372-4551-b9fd-e3d30fd98f49",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        delete_posts: {
          returning: [
            {
              id: "a6da5ec4-3900-4da0-ac13-bafeef14e083",
            },
            {
              id: "f8b4855a-f372-4551-b9fd-e3d30fd98f49",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:34 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "244",
      "Connection",
      "close",
      "x-request-id",
      "39dedd27de90771df88477593a62f4ef",
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
      "84374d077c9468b0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: PostsBoolExp!) {\n  deletePosts(where: $where) {\n    returning {\n      id\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "926812ce-7f70-487a-8026-51c8404456f7",
            "5c48097a-ba80-45cf-afe9-b59d279277d0",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        deletePosts: {
          returning: [
            {
              id: "926812ce-7f70-487a-8026-51c8404456f7",
            },
            {
              id: "5c48097a-ba80-45cf-afe9-b59d279277d0",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:36 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "243",
      "Connection",
      "close",
      "x-request-id",
      "8eebea622392b43a97f109b9c3ab9e0e",
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
      "84374d0c4fe2733a-BUD",
    ],
  );

// Mock for DeleteManyPosts with includeTitle=true from gqlVariables
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: posts_bool_exp!, $includeTitle: Boolean = false) {\n  delete_posts(where: $where) {\n    returning {\n      id\n      title @include(if: $includeTitle)\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e0f",
            "f0e1d2c3-b4a5-6789-8f7e-6d5c4b3a2f1e",
          ],
        },
      },
      includeTitle: true,
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        delete_posts: {
          returning: [
            {
              id: "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e0f",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "f0e1d2c3-b4a5-6789-8f7e-6d5c4b3a2f1e",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:37 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "244",
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
      "84374d119bef684c-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation DeleteManyPosts($where: posts_bool_exp!, $includeTitle: Boolean = false) {\n  delete_posts(where: $where) {\n    returning {\n      id\n      title @include(if: $includeTitle)\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "d3c2b1a0-f9e8-7d6c-5b4a-3f2e1d0c9b8a",
            "a9b8c7d6-e5f4-3210-2f1e-0d9c8b7a6f5e",
          ],
        },
      },
    },
    operationName: "DeleteManyPosts",
  })
  .reply(
    200,
    {
      data: {
        delete_posts: {
          returning: [
            {
              id: "d3c2b1a0-f9e8-7d6c-5b4a-3f2e1d0c9b8a",
            },
            {
              id: "a9b8c7d6-e5f4-3210-2f1e-0d9c8b7a6f5e",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:24:38 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "136",
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
      "84374d161b7f733a-BUD",
    ],
  );
