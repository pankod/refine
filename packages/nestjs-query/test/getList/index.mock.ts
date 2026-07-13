import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query BlogPostsList($paging: OffsetPaging!, $filter: BlogPostFilter, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      status\n      category {\n        id\n      }\n    }\n    totalCount\n  }\n}\n",
    variables: {
      filter: {
        id: { lt: 500 },
        status: { eq: "PUBLISHED" },
        category: { id: { eq: 1 } },
      },
      sorting: [{ field: "id", direction: "DESC" }],
      paging: { limit: 5, offset: 5 },
    },
    operationName: "BlogPostsList",
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "332",
              status: "PUBLISHED",
              category: { id: "1" },
            },
            {
              id: "307",
              status: "PUBLISHED",
              category: { id: "1" },
            },
            {
              id: "290",
              status: "PUBLISHED",
              category: { id: "1" },
            },
            {
              id: "249",
              status: "PUBLISHED",
              category: { id: "1" },
            },
            {
              id: "213",
              status: "PUBLISHED",
              category: { id: "1" },
            },
          ],
          totalCount: 13,
        },
      },
    },
    [
      "Date",
      "Wed, 20 Dec 2023 07:59:42 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "331",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"14b-nOpqc7yIQ1vFwVuKcUn1H9OYv28"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query: "query  { blogPosts  { nodes { id, title }, totalCount } }",
    variables: {},
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Corporis unde mollitia laudantium.",
            },
            {
              id: "2",
              title:
                "Consequuntur culpa iusto quidem molestias numquam blanditiis pariatur.",
            },
            { id: "3", title: "Ipsam esse recusandae." },
            { id: "4", title: "Culpa doloribus nostrum eius." },
            {
              id: "5",
              title:
                "Necessitatibus sequi ut quidem recusandae libero voluptate iure debitis.",
            },
            {
              id: "6",
              title:
                "Blanditiis esse voluptatibus ea quo delectus itaque labore nesciunt corrupti.",
            },
            {
              id: "7",
              title: "Autem similique dolor delectus harum illum soluta.",
            },
            {
              id: "8",
              title: "Incidunt dolore consequatur inventore tempora.",
            },
            { id: "9", title: "Hic numquam molestias." },
            {
              id: "10",
              title:
                "Delectus architecto vero velit ea pariatur doloremque vel dicta delectus.",
            },
          ],
          totalCount: 500,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:35:17 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "768",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"300-U10LSLMEkGZVPaANCrZCWI9XbT0"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sorting: [BlogPostSort!]!) { blogPosts (sorting: $sorting) { nodes { id }, totalCount } }",
    variables: { sorting: [{ field: "id", direction: "DESC" }] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "500" },
            { id: "499" },
            { id: "498" },
            { id: "497" },
            { id: "496" },
            { id: "495" },
            { id: "494" },
            { id: "493" },
            { id: "492" },
            { id: "491" },
          ],
          totalCount: 500,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:35:17 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "182",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"b6-kliVJbbq2glQKMJJ1acZqmF5NnU"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sorting: [BlogPostSort!]!) { blogPosts (sorting: $sorting) { nodes { id, status }, totalCount } }",
    variables: {
      sorting: [
        { field: "status", direction: "ASC" },
        { field: "id", direction: "DESC" },
      ],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "498", status: "DRAFT" },
            { id: "496", status: "DRAFT" },
            { id: "492", status: "DRAFT" },
            { id: "489", status: "DRAFT" },
            { id: "487", status: "DRAFT" },
            { id: "486", status: "DRAFT" },
            { id: "483", status: "DRAFT" },
            { id: "477", status: "DRAFT" },
            { id: "474", status: "DRAFT" },
            { id: "473", status: "DRAFT" },
          ],
          totalCount: 500,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:35:17 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "352",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"160-CJ+kzPao/iroPxUvIE1oVfU/7EU"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($paging: OffsetPaging!) { blogPosts (paging: $paging) { nodes { id }, totalCount } }",
    variables: { paging: { limit: 10, offset: 10 } },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "11" },
            { id: "12" },
            { id: "13" },
            { id: "14" },
            { id: "15" },
            { id: "16" },
            { id: "17" },
            { id: "18" },
            { id: "19" },
            { id: "20" },
          ],
          totalCount: 500,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:35:18 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "172",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"ac-11OiQB15EYYlR1UxGZMlz3sh6ZU"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { id, title }, totalCount } }",
    variables: { filter: { id: { eq: "1" } } },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Corporis unde mollitia laudantium.",
            },
          ],
          totalCount: 1,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:47:39 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "106",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"6a-yF+kzvlfsTzKl7Xwl+BQrUzZHfY"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { id, status }, totalCount } }",
    variables: { filter: { id: { lt: 10 }, status: { eq: "DRAFT" } } },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "4", status: "DRAFT" },
            { id: "5", status: "DRAFT" },
          ],
          totalCount: 2,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:35:18 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "106",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"6a-PNNemDRvH4oDgBqBH6lJZI1b6MA"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { id, status }, totalCount } }",
    variables: {
      filter: { and: [{ id: { lt: 10 }, status: { eq: "DRAFT" } }] },
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "4", status: "DRAFT" },
            { id: "5", status: "DRAFT" },
          ],
          totalCount: 2,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:35:18 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "106",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"6a-PNNemDRvH4oDgBqBH6lJZI1b6MA"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sorting: [BlogPostSort!]!) { blogPosts (sorting: $sorting) { nodes { id, title }, totalCount } }",
    variables: { sorting: [{ field: "id", direction: "ASC" }] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Corporis unde mollitia laudantium.",
            },
            {
              id: "2",
              title:
                "Consequuntur culpa iusto quidem molestias numquam blanditiis pariatur.",
            },
            { id: "3", title: "Ipsam esse recusandae." },
            { id: "4", title: "Culpa doloribus nostrum eius." },
            {
              id: "5",
              title:
                "Necessitatibus sequi ut quidem recusandae libero voluptate iure debitis.",
            },
            {
              id: "6",
              title:
                "Blanditiis esse voluptatibus ea quo delectus itaque labore nesciunt corrupti.",
            },
            {
              id: "7",
              title: "Autem similique dolor delectus harum illum soluta.",
            },
            {
              id: "8",
              title: "Incidunt dolore consequatur inventore tempora.",
            },
            { id: "9", title: "Hic numquam molestias." },
            {
              id: "10",
              title:
                "Delectus architecto vero velit ea pariatur doloremque vel dicta delectus.",
            },
          ],
          totalCount: 500,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:35:19 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "768",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"300-U10LSLMEkGZVPaANCrZCWI9XbT0"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { title }, totalCount } }",
    variables: { filter: { id: { eq: "907" } } },
  })
  .reply(200, { data: { blogPosts: { nodes: [], totalCount: 0 } } }, [
    "Date",
    "Tue, 19 Dec 2023 13:35:19 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "51",
    "Connection",
    "close",
    "X-Powered-By",
    "Express",
    "Access-Control-Allow-Origin",
    "*",
    "cache-control",
    "no-store",
    "ETag",
    'W/"33-9H6zC3hzMOwqreHqzZeIXUvJQ9w"',
    "Strict-Transport-Security",
    "max-age=15724800; includeSubDomains",
  ]);

nock("http://localhost:3003", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) { blogPosts (filter: $filter, sorting: $sorting) { nodes { id, title, category { id, title } }, totalCount } }",
    variables: {
      filter: { category: { id: { eq: "8" } } },
      sorting: [{ field: "title", direction: "ASC" }],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "413",
              title: "Ab error dolor vero ad eligendi impedit laborum.",
              category: { id: "8", title: "et" },
            },
            {
              id: "49",
              title:
                "Aliquam repellat velit natus ipsa deserunt ullam occaecati quas.",
              category: { id: "8", title: "et" },
            },
            {
              id: "63",
              title:
                "Animi ex perspiciatis dolores necessitatibus omnis dicta odit molestiae accusamus.",
              category: { id: "8", title: "et" },
            },
            {
              id: "98",
              title:
                "Aperiam enim numquam quidem laudantium molestias asperiores.",
              category: { id: "8", title: "et" },
            },
            {
              id: "466",
              title:
                "Aperiam nam exercitationem voluptates tempora consectetur.",
              category: { id: "8", title: "et" },
            },
            {
              id: "376",
              title: "Blanditiis aspernatur nostrum expedita labore a ipsa.",
              category: { id: "8", title: "et" },
            },
            {
              id: "16",
              title: "Consectetur vitae saepe.",
              category: { id: "8", title: "et" },
            },
            {
              id: "446",
              title: "Deserunt impedit pariatur suscipit sit mollitia minus.",
              category: { id: "8", title: "et" },
            },
            {
              id: "358",
              title: "Dolores dolores accusamus quam.",
              category: { id: "8", title: "et" },
            },
            {
              id: "37",
              title:
                "Dolores tempore alias laudantium fugiat consectetur eum vitae magnam.",
              category: { id: "8", title: "et" },
            },
          ],
          totalCount: 24,
        },
      },
    },
    [
      "Date",
      "Tue, 19 Dec 2023 13:52:27 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "1179",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Access-Control-Allow-Origin",
      "*",
      "cache-control",
      "no-store",
      "ETag",
      'W/"49b-1Kq09ZxfVTQZU2jd4iaG4Z8NWQI"',
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
    ],
  );
