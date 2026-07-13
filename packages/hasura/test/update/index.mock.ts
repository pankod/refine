import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id, title, content, category { id }\n  }\n    }",
    variables: {
      pk_columns: { id: "572708c7-840d-430a-befd-1416bdee799a" },
      _set: {
        title: "Updated Title",
        content: "Updated Content",
        category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
  })
  .reply(
    200,
    {
      data: {
        update_posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Updated Title",
          content: "Updated Content",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:44 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "186",
      "Connection",
      "close",
      "x-request-id",
      "c83f9450984dc08bb949e59f96fe73a8",
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
      "8437d4059f6c6852-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id\n  }\n    }",
    variables: {
      pk_columns: { id: "572708c7-840d-430a-befd-1416bdee799a" },
      _set: { title: "E-business alarm" },
    },
  })
  .reply(
    200,
    {
      data: {
        update_posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:45 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "77",
      "Connection",
      "close",
      "x-request-id",
      "acf14fb9e0045bb9d8360a94a32700a3",
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
      "8437d4116c44733b-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($pkColumns: PostsPkColumnsInput!, $_set: PostsSetInput!) {\n      updatePostsByPk (pkColumns: $pkColumns, _set: $_set) {\n    id, title, content, category { id }\n  }\n    }",
    variables: {
      pkColumns: { id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131" },
      _set: {
        title: "Updated Title",
        content: "Updated Content",
        categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
  })
  .reply(
    200,
    {
      data: {
        updatePostsByPk: {
          id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
          title: "Updated Title",
          content: "Updated Content",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:47 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "183",
      "Connection",
      "close",
      "x-request-id",
      "32d0880334f7487f14755177a20bb74d",
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
      "8437d415dbd1c1b4-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation ($pkColumns: PostsPkColumnsInput!, $_set: PostsSetInput!) {\n      updatePostsByPk (pkColumns: $pkColumns, _set: $_set) {\n    id\n  }\n    }",
    variables: {
      pkColumns: { id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131" },
      _set: { title: "E-business alarm" },
    },
  })
  .reply(
    200,
    {
      data: {
        updatePostsByPk: { id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131" },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:48 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "74",
      "Connection",
      "close",
      "x-request-id",
      "0dc5bbaf9528d4145093f0c43468778d",
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
      "8437d41fb8de7339-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdatePost($id: uuid!, $object: posts_set_input!) {\n  update_posts_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    category_id\n    category {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      id: "572708c7-840d-430a-befd-1416bdee799a",
      object: {
        title: "Updated Title",
        content: "Updated Content",
        category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
    operationName: "UpdatePost",
  })
  .reply(
    200,
    {
      data: {
        update_posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Updated Title",
          content: "Updated Content",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
          category: {
            id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            title: "lorem1 integer tincidunt",
          },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:49 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "274",
      "Connection",
      "close",
      "x-request-id",
      "73b68f3aa92d51f19c430e2a6155ee90",
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
      "8437d428dcb31cfa-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdatePost($id: uuid!, $object: posts_set_input!) {\n  update_posts_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    category_id\n    category {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      id: "572708c7-840d-430a-befd-1416bdee799a",
      object: {
        title: "Updated Title",
        content: "Updated Content",
        category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
    operationName: "UpdatePost",
  })
  .reply(
    200,
    {
      data: {
        update_posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Updated Title",
          content: "Updated Content",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
          category: {
            id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            title: "lorem1 integer tincidunt",
          },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:50 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "274",
      "Connection",
      "close",
      "x-request-id",
      "f6a2d286950b5c15d874b49413e3c479",
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
      "8437d431f89768c1-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdatePost($id: uuid!, $object: PostsSetInput!) {\n  updatePostsByPk(pkColumns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    categoryId\n    category {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
      object: {
        title: "Updated Title",
        content: "Updated Content",
        categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
    operationName: "UpdatePost",
  })
  .reply(
    200,
    {
      data: {
        updatePostsByPk: {
          id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
          title: "Updated Title",
          content: "Updated Content",
          categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
          category: {
            id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            title: "lorem1 integer tincidunt",
          },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:51 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "270",
      "Connection",
      "close",
      "x-request-id",
      "e126ad1ca5d8bdecdf47df82a7b046da",
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
      "8437d4371d5a733c-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdatePost($id: uuid!, $object: PostsSetInput!) {\n  updatePostsByPk(pkColumns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    categoryId\n    category {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
      object: {
        title: "Updated Title",
        content: "Updated Content",
        categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
    operationName: "UpdatePost",
  })
  .reply(
    200,
    {
      data: {
        updatePostsByPk: {
          id: "2a0d531e-ad15-440f-bf0b-7d23e7e21131",
          title: "Updated Title",
          content: "Updated Content",
          categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
          category: {
            id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            title: "lorem1 integer tincidunt",
          },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:52 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "270",
      "Connection",
      "close",
      "x-request-id",
      "46167fdd2d635b7cba63b13326a65d3b",
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
      "8437d43c5966c1c6-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdatePost($id: uuid!, $object: posts_set_input!, $includeCategory: Boolean = false) {\n  update_posts_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    category_id\n    category @include(if: $includeCategory) {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      id: "572708c7-840d-430a-befd-1416bdee799a",
      object: {
        title: "Updated Title",
        content: "Updated Content",
        category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
      includeCategory: true,
    },
    operationName: "UpdatePost",
  })
  .reply(
    200,
    {
      data: {
        update_posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Updated Title",
          content: "Updated Content",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
          category: {
            id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            title: "lorem1 integer tincidunt",
          },
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:53 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "274",
      "Connection",
      "close",
      "x-request-id",
      "83f68d28a0c651f19c430e2a6155ee90",
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
      "8437d441abf61cf1-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "mutation UpdatePost($id: uuid!, $object: posts_set_input!, $includeCategory: Boolean = false) {\n  update_posts_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    category_id\n    category @include(if: $includeCategory) {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      id: "572708c7-840d-430a-befd-1416bdee799a",
      object: {
        title: "Updated Title",
        content: "Updated Content",
        category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
      },
    },
    operationName: "UpdatePost",
  })
  .reply(
    200,
    {
      data: {
        update_posts_by_pk: {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Updated Title",
          content: "Updated Content",
          category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 20:56:53 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "274",
      "Connection",
      "close",
      "x-request-id",
      "83f68d28a0c651f19c430e2a6155ee90",
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
      "8437d441abf61cf1-BUD",
    ],
  );
