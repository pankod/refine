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
              id: "bae22655-73ed-4de6-a8c5-d8c2212e896f",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
              category: {
                id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              },
            },
            {
              id: "865fc5b1-be18-47ab-9ab1-802900504b66",
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
      "Wed, 10 Jan 2024 19:14:28 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "435",
      "Connection",
      "close",
      "x-request-id",
      "687a58dd0906f0837d0da93a4197080b",
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
      "84373e327949733c-BUD",
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
              id: "06b353b2-a807-4e47-a31d-8a158b7615ad",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "967c5e7c-989b-47a6-a58c-c275ba0360c6",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:30 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "244",
      "Connection",
      "close",
      "x-request-id",
      "055627c773bb85e9696fadb173ff6e4a",
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
      "84373e433a01c1b9-BUD",
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
              id: "3421b44f-d3b2-483b-859a-8c582bb54a92",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
              category: {
                id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              },
            },
            {
              id: "badc5899-00c8-4557-bc7a-c535f0e280f7",
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
      "Wed, 10 Jan 2024 19:14:31 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "434",
      "Connection",
      "close",
      "x-request-id",
      "d0d7ad32d9c778ace914c83a18116266",
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
      "84373e4bebe0684c-BUD",
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
              id: "093728df-2cd5-486b-bccd-f1718c930967",
              title: "Aenean ultricies non libero sit amet pellentesque",
            },
            {
              id: "3bfffca3-b226-4f84-baf8-f0967dfbf334",
              title: "Etiam tincidunt ex ut auctor faucibus",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:33 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "243",
      "Connection",
      "close",
      "x-request-id",
      "b60c70e3cc178bdcb77c7a702b648b7f",
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
      "84373e55fe6b7340-BUD",
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
              id: "4a138a70-10e8-4422-93da-9d14111db187",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
              category: {
                id: "e27156c3-9998-434f-bd5b-2b078283ff26",
              },
            },
            {
              id: "de84edb5-045f-4edd-a9a5-3f6c03e4a09e",
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
      "Wed, 10 Jan 2024 19:14:34 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "435",
      "Connection",
      "close",
      "x-request-id",
      "a408b447770e903a105d686cfdc7fbfd",
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
      "84373e5f7e611cc0-BUD",
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
              id: "ef2f8304-96cb-4ae5-b91a-b3f94d767eeb",
              title: "Aenean ultricies non libero sit amet pellentesque",
              content: "Vestibulum vulputate sapien arcu.",
            },
            {
              id: "8f837266-6485-4d22-b5f1-2fe513242d8d",
              title: "Etiam tincidunt ex ut auctor faucibus",
              content: "Aliquam nibh erat.",
            },
          ],
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:34 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "320",
      "Connection",
      "close",
      "x-request-id",
      "7f44ab0c8bb82f7dffee976444eee3e0",
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
      "84373e653dd703bf-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($object: posts_insert_input!) {\n      insert_posts_one (object: $object) {\n    id, title, content, category { id }\n  }\n    }",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
    },
  })
  .reply(
    200,
    {
      data: {
        insert_posts_one: {
          id: "3820614d-aa76-475e-b243-698f9bf6c4c2",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
          category: { id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:36 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "201",
      "Connection",
      "close",
      "x-request-id",
      "7b890e90262193d7cdf4778ca861e749",
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
      "84373e703856684d-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($object: PostsInsertInput!) {\n      insertPostsOne (object: $object) {\n    id, title, content, category { id }\n  }\n    }",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        categoryId: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
    },
  })
  .reply(
    200,
    {
      data: {
        insertPostsOne: {
          id: "4c39c74c-d8ef-4e32-a505-7622c709d8d8",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
          category: { id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:37 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "199",
      "Connection",
      "close",
      "x-request-id",
      "a3a775e0dab65cc3fc2d91ba86ce4635",
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
      "84373e750cf61cfa-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreatePost($object: posts_insert_input!) {\n  insert_posts_one(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
    },
    operationName: "CreatePost",
  })
  .reply(
    200,
    {
      data: {
        insert_posts_one: {
          id: "ac52f88a-3d33-41ff-bfb5-44209359fc5d",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
          category: { id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:38 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "201",
      "Connection",
      "close",
      "x-request-id",
      "0bbe7e43de4820dc2c908580bc0ece1b",
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
      "84373e7ae943733a-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreatePost($object: posts_insert_input!) {\n  insert_posts_one(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
    },
    operationName: "CreatePost",
  })
  .reply(
    200,
    {
      data: {
        insert_posts_one: {
          id: "c99d7022-322a-4ad8-ba94-5aae3a9e1385",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
          category: { id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:39 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "201",
      "Connection",
      "close",
      "x-request-id",
      "0563e76cb4c4bb24cf51abe08d5e158b",
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
      "84373e800b1f6852-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreatePost($object: PostsInsertInput!) {\n  insertPostsOne(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        categoryId: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
    },
    operationName: "CreatePost",
  })
  .reply(
    200,
    {
      data: {
        insertPostsOne: {
          id: "2dfea57e-735d-4913-80bb-1b2973569c06",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
          category: { id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:40 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "199",
      "Connection",
      "close",
      "x-request-id",
      "7d58751bcd7545bcccb2e2afd63be084",
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
      "84373e852d2168ad-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreatePost($object: PostsInsertInput!) {\n  insertPostsOne(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        categoryId: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
    },
    operationName: "CreatePost",
  })
  .reply(
    200,
    {
      data: {
        insertPostsOne: {
          id: "5395389a-0515-409d-95af-8a9e2c786177",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
          category: { id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:41 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "199",
      "Connection",
      "close",
      "x-request-id",
      "aa0cac7eecc052013508341d216550d8",
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
      "84373e8abc566850-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreatePost($object: posts_insert_input!, $includeCategory: Boolean = false) {\n  insert_posts_one(object: $object) {\n    id\n    title\n    content\n    category @include(if: $includeCategory) {\n      id\n    }\n  }\n}\n",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
      includeCategory: true,
    },
    operationName: "CreatePost",
  })
  .reply(
    200,
    {
      data: {
        insert_posts_one: {
          id: "d87e5a0f-1e31-4f90-8242-4a29a4ea6d9c",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
          category: { id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:42 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "201",
      "Connection",
      "close",
      "x-request-id",
      "c4e58f92ba1d7aef3294c1d7a72e9f10",
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
      "84373e8ffac14532-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation CreatePost($object: posts_insert_input!, $includeCategory: Boolean = false) {\n  insert_posts_one(object: $object) {\n    id\n    title\n    content\n    category @include(if: $includeCategory) {\n      id\n    }\n  }\n}\n",
    variables: {
      object: {
        content: "Lorem ipsum dolor sit amet.",
        title: "Lorem ipsum dolore",
        category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
      },
    },
    operationName: "CreatePost",
  })
  .reply(
    200,
    {
      data: {
        insert_posts_one: {
          id: "e98f2a1f-c42c-4b17-91d5-f853a4c7e3d1",
          title: "Lorem ipsum dolore",
          content: "Lorem ipsum dolor sit amet.",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:14:43 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "139",
      "Connection",
      "close",
      "x-request-id",
      "d3a75b91cba6e4d77c9e8f4a23b5f1a9",
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
      "84373e95a9fb683c-BUD",
    ],
  );
