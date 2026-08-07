import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [posts_insert_input!]!) {\n  insert_posts(objects: $objects) {\n    returning {\n      id\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insert_posts: {
          returning: [
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
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:28 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "435",
      "Connection",
      "close",
      "x-request-id",
      "cf0905220dab318f2d375a2fee718c1c",
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
      "84376ba04a961cbc-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [posts_insert_input!]!) {\n  insert_posts(objects: $objects) {\n    returning {\n      id\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insert_posts: {
          returning: [
            {
              id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "d5448401-4860-48d4-96ab-0cea03fb9864",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:29 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "244",
      "Connection",
      "close",
      "x-request-id",
      "d058e1cd290a9de40574d7dc0cf8a366",
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
      "84376ba9bf0ac1be-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [PostsInsertInput!]!) {\n  insertPosts(objects: $objects) {\n    returning {\n      id\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insertPosts: {
          returning: [
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
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:31 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "434",
      "Connection",
      "close",
      "x-request-id",
      "be077ae83240bb68d6e9516d2a7b1cbc",
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
      "84376bb2ed2768bc-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [PostsInsertInput!]!) {\n  insertPosts(objects: $objects) {\n    returning {\n      id\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insertPosts: {
          returning: [
            {
              id: "863c2abb-e368-4ae0-8c0c-a1d7d1ec4630",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "d0fc6e73-8372-449f-bb3b-e633ea7e2817",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:33 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "243",
      "Connection",
      "close",
      "x-request-id",
      "449b6444766cf6755815512938c1f84b",
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
      "84376bbd7c8d7339-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [posts_insert_input!]!) {\n  insert_posts(objects: $objects) {\n    returning {\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insert_posts: {
          returning: [
            {
              id: "286b07cd-e32f-4848-a0a9-05b997d69988",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
              category: {
                id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              },
            },
            {
              id: "34275a5a-890a-47e0-a42f-dfcb2507b402",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Aliquam nibh erat.",
              category: {
                id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              },
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:35 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "435",
      "Connection",
      "close",
      "x-request-id",
      "e2534521346da9672af204f2497fff57",
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
      "84376bc6ceeb68bb-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [PostsInsertInput!]!) {\n  insertPosts(objects: $objects) {\n    returning {\n      id\n      title\n      content\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
        },
      ],
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insertPosts: {
          returning: [
            {
              id: "1fa3a0db-1af2-4520-81a2-87ec55a78747",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
            },
            {
              id: "1772c614-f060-4fbb-b464-a204add29ea7",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Aliquam nibh erat.",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:36 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "320",
      "Connection",
      "close",
      "x-request-id",
      "0f8d47c96a18746037bb1c6e326a99ef",
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
      "84376bd60fb703bf-BUD",
    ],
  );

// Mock for CreateManyPosts with includeCategory=true from gqlVariables
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [posts_insert_input!]!, $includeCategory: Boolean = false) {\n  insert_posts(objects: $objects) {\n    returning {\n      id\n      title\n      content\n      category @include(if: $includeCategory) {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
      includeCategory: true,
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insert_posts: {
          returning: [
            {
              id: "f1c8b6d7-3e5a-4c2b-9f8d-1e5a7b9d0c3e",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
              category: {
                id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              },
            },
            {
              id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Aliquam nibh erat.",
              category: {
                id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              },
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:38 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "435",
      "Connection",
      "close",
      "x-request-id",
      "fd98c24a10b32a6e7c1f5d9b8e4a2c1d",
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
      "84376be01cba684c-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreateManyPosts($objects: [posts_insert_input!]!, $includeCategory: Boolean = false) {\n  insert_posts(objects: $objects) {\n    returning {\n      id\n      title\n      content\n      category @include(if: $includeCategory) {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      objects: [
        {
          content: "Vestibulum vulputate sapien arcu.",
          title: "Aenean ultricies non libero sit amet pellentesque",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
        {
          content: "Aliquam nibh erat.",
          title: "Etiam tincidunt ex ut auctor faucibus",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      ],
    },
    operationName: "CreateManyPosts",
  })
  .reply(
    200,
    {
      data: {
        insert_posts: {
          returning: [
            {
              id: "b5c6d7e8-f9a0-1b2c-3d4e-5f6a7b8c9d0e",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
            },
            {
              id: "e1f2a3b4-c5d6-7e8f-9a0b-1c2d3e4f5a6b",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Aliquam nibh erat.",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:45:39 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "320",
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
      "84376be52f6d733a-BUD",
    ],
  );
