import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts(where: $where, _set: $_set) {\n    returning {\n      id\n      id\n      title\n      content\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
            "881a45fd-a5da-46f4-a045-58eeb647862f",
          ],
        },
      },
      _set: { content: "Updated Content" },
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        update_posts: {
          returning: [
            {
              id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Updated Content",
            },
            {
              id: "881a45fd-a5da-46f4-a045-58eeb647862f",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Updated Content",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:14 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "300",
      "Connection",
      "close",
      "x-request-id",
      "9b18068ecca92823b80378748040bf35",
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
      "845ca9f6df556846-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts(where: $where, _set: $_set) {\n    returning {\n      id\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "b8a4c5ee-16a0-4c90-bc8d-84ae7085c575",
            "71cc13bf-6261-4cd4-a892-22250eb0f6b3",
          ],
        },
      },
      _set: {
        title: "Multiple Updated Title",
        content: "Multiple Updated Content",
      },
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        update_posts: {
          returning: [
            { id: "b8a4c5ee-16a0-4c90-bc8d-84ae7085c575" },
            { id: "71cc13bf-6261-4cd4-a892-22250eb0f6b3" },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:14 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "136",
      "Connection",
      "close",
      "x-request-id",
      "dd77da1724d32ac349dd1a4f1ac91145",
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
      "845ca9fb6a751ce6-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($where: PostsBoolExp!, $_set: PostsSetInput!) {\n  updatePosts(where: $where, _set: $_set) {\n    returning {\n      id\n      id\n      title\n      content\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            "ae316d48-025a-47db-b4c0-ff4694f52c85",
          ],
        },
      },
      _set: { content: "Updated Content" },
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        updatePosts: {
          returning: [
            {
              id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Updated Content",
            },
            {
              id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Updated Content",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:15 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "299",
      "Connection",
      "close",
      "x-request-id",
      "93cb875bd6f13a75ec1846a367c1b1a6",
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
      "845ca9ff8e40733a-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($where: PostsBoolExp!, $_set: PostsSetInput!) {\n  updatePosts(where: $where, _set: $_set) {\n    returning {\n      id\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "3d71a408-ac30-41f2-b530-3fe951b16b86",
            "9cff1379-349e-4a4c-b436-b18d12857c5c",
          ],
        },
      },
      _set: {
        title: "Multiple Updated Title",
        content: "Multiple Updated Content",
      },
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        updatePosts: {
          returning: [
            { id: "3d71a408-ac30-41f2-b530-3fe951b16b86" },
            { id: "9cff1379-349e-4a4c-b436-b18d12857c5c" },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:16 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "135",
      "Connection",
      "close",
      "x-request-id",
      "f9c6524b650963a68da303f687b415c1",
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
      "845caa049aec1cc8-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($ids: [uuid!]!, $_set: posts_set_input!) {\n  update_posts(where: {id: {_in: $ids}}, _set: $_set) {\n    returning {\n      id\n      title\n      content\n    }\n  }\n}\n",
    variables: {
      ids: [
        "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
        "881a45fd-a5da-46f4-a045-58eeb647862f",
      ],
      _set: { content: "Updated Content" },
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        update_posts: {
          returning: [
            {
              id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Updated Content",
            },
            {
              id: "881a45fd-a5da-46f4-a045-58eeb647862f",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Updated Content",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:16 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "300",
      "Connection",
      "close",
      "x-request-id",
      "699334d21a594d590a06e5f2a391cdeb",
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
      "845caa092a9903bf-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($ids: [uuid!]!, $_set: PostsSetInput!) {\n  updatePosts(where: {id: {_in: $ids}}, _set: $_set) {\n    returning {\n      id\n      title\n      content\n    }\n  }\n}\n",
    variables: {
      ids: [
        "4ec22cb3-b679-4891-a489-3d19cf275ab3",
        "ae316d48-025a-47db-b4c0-ff4694f52c85",
      ],
      _set: { content: "Updated Content" },
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        updatePosts: {
          returning: [
            {
              id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Updated Content",
            },
            {
              id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Updated Content",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:17 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "299",
      "Connection",
      "close",
      "x-request-id",
      "a47bcb3f3bfddb25760ce46236b64635",
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
      "845caa0db9c0c1b9-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($ids: [uuid!]!, $_set: posts_set_input!, $includeTitle: Boolean = false) {\n  update_posts(where: {id: {_in: $ids}}, _set: $_set) {\n    returning {\n      id\n      content\n      title @include(if: $includeTitle)\n    }\n  }\n}\n",
    variables: {
      ids: [
        "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
        "881a45fd-a5da-46f4-a045-58eeb647862f",
      ],
      _set: { content: "Updated Content" },
      includeTitle: true,
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        update_posts: {
          returning: [
            {
              id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
              content: "Updated Content",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "881a45fd-a5da-46f4-a045-58eeb647862f",
              content: "Updated Content",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:18 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "300",
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
      "845caa12c9a1684c-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdateManyPosts($ids: [uuid!]!, $_set: posts_set_input!, $includeTitle: Boolean = false) {\n  update_posts(where: {id: {_in: $ids}}, _set: $_set) {\n    returning {\n      id\n      content\n      title @include(if: $includeTitle)\n    }\n  }\n}\n",
    variables: {
      ids: [
        "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
        "881a45fd-a5da-46f4-a045-58eeb647862f",
      ],
      _set: { content: "Updated Content" },
    },
    operationName: "UpdateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        update_posts: {
          returning: [
            {
              id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
              content: "Updated Content",
            },
            {
              id: "881a45fd-a5da-46f4-a045-58eeb647862f",
              content: "Updated Content",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Mon, 15 Jan 2024 08:14:19 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "194",
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
      "845caa17bd56733a-BUD",
    ],
  );
