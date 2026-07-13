import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetManyBlogPosts",
    query:
      "\n  query GetManyBlogPosts($filter: BlogPostFilter!) {\n    blogPosts(filter: $filter) {\n      nodes {\n        id\n        title\n        content\n      }\n    }\n  }\n",
    variables: { filter: { id: { in: ["113", "369"] } } },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "113",
              title: "Updated Title 3",
              content:
                "Accusamus dolorum perspiciatis dignissimos magni ea quisquam. Quae molestias sint atque autem quasi doloremque eos quam veniam. Recusandae magni culpa tempora odio laboriosam quasi.\nPlaceat inventore delectus debitis rerum iure consequuntur ex. Assumenda pariatur placeat ea laboriosam hic enim molestias consequatur deleniti. Expedita explicabo delectus ex consequuntur nostrum.\nAliquam culpa a fugit quam delectus nam. Nam sapiente similique perferendis architecto. Blanditiis vel sequi recusandae.",
            },
            {
              id: "369",
              title:
                "Repellendus quaerat possimus eos alias eius maiores a molestias beatae.",
              content:
                "Aperiam voluptate eum eligendi aliquam omnis. Velit error asperiores modi quidem. Fugiat dolor id dolores.\nReprehenderit occaecati possimus fugit cum. Eaque accusantium nobis dolor praesentium. Sequi doloremque quam quas accusamus officia aliquam praesentium.\nBeatae consectetur nostrum quis deleniti. Voluptatem voluptas ipsa esse fugiat eaque at. Architecto soluta voluptatem nulla.",
            },
          ],
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "1083",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:34:31 GMT",
      etag: 'W/"43b-QZf3CKF5ZxyJ0sUOJHFCIrubISk"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
