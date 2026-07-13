import nock from "nock";

nock("https://api.nestjsx-crud.refine.dev:443", { encodedQueryParams: true })
  .patch("/posts/0b4faa6d-6726-4967-be13-e9d05d9aef7f", {
    title: "updated-title",
  })
  .reply(
    200,
    {
      status: "draft",
      id: "0b4faa6d-6726-4967-be13-e9d05d9aef7f",
      title: "updated-title",
      content:
        "Ipsum voluptas exercitationem. Nesciunt soluta et asperiores sequi dolorem. Dolor velit aut est omnis facilis quisquam quo.\n \rEst sed quas illo ut. Deserunt et quas quia sint consequatur veniam. Eius rerum totam quae non et omnis minima.\n \rAnimi corporis velit consequatur qui consequatur. Debitis consequuntur tempore aut asperiores. Eum delectus culpa aut exercitationem fugiat blanditiis eligendi facere vel. Autem quo delectus id fugit culpa delectus.\n \rSuscipit nesciunt voluptatum necessitatibus non. Eveniet minus natus suscipit odit. Accusantium itaque dolores quaerat vitae.\n \rAlias iusto sunt dolorem numquam et necessitatibus est ducimus. Enim necessitatibus maxime praesentium vitae deleniti. Et aliquid ipsam et dolorum molestias consectetur reiciendis tenetur. Incidunt eaque qui ut. Quia deleniti est aut est unde. Fuga repellendus eius est harum nisi non.\n \rOptio voluptas et rerum accusamus ut molestiae molestiae. Architecto et alias architecto rerum. Dicta atque qui facilis labore totam hic. Nobis rerum illum optio qui dolorem vitae. Animi sit eligendi. Quia doloribus ad atque omnis.\n \rReprehenderit explicabo quas autem recusandae cumque vel reiciendis est. Minima cum odit ut porro et nam vitae. At suscipit sequi corporis non quaerat. Quod sint repellat officia at repudiandae. Voluptatibus ipsa quibusdam tempore nulla optio quidem vel temporibus placeat.\n \rNeque et debitis et aliquid id sunt voluptatem tempora vel. Impedit accusamus ratione maiores eaque est velit vero porro dignissimos. Unde velit soluta natus.\n \rDolore ipsam rem quas. Veniam ducimus voluptate adipisci amet recusandae maiores voluptatem ducimus consectetur. Repellat ut nisi. Et ut expedita eligendi.\n \rLibero qui sint eum similique cupiditate accusamus. Vel autem ut tempora facilis voluptate. Voluptatem explicabo ut quae inventore dolorem laudantium consequuntur ut non. Rerum sint et voluptatem aliquam occaecati aspernatur eius quo.",
      slug: "updated-title",
      images: [
        {
          uid: "rc-upload-v4rbubtwta",
          name: "random-image.jpg",
          url: "https://picsum.photos/800",
          type: "image/jpeg",
          size: 141940,
          percent: 100,
          status: "done",
        },
      ],
      createdAt: "2021-04-06T08:28:33.805Z",
      updatedAt: "2021-04-06T08:29:47.520Z",
      category: {
        id: "8968123a-837b-4a24-9822-9712608549d7",
        title: "Clear-Thinking Deposit Reduced",
        createdAt: "2021-04-06T08:28:33.977Z",
        updatedAt: "2021-04-06T08:28:33.977Z",
      },
      user: {
        id: "830a3394-249b-454e-b5d0-6f9e9aba0dd9",
        firstName: "Easter",
        lastName: "Fadel",
        email: "easter_Fadel@yahoo.com",
        status: true,
        createdAt: "2021-04-06T08:28:33.755Z",
        updatedAt: "2021-04-06T08:28:33.755Z",
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Tue, 06 Apr 2021 08:29:47 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "2715",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "X-Powered-By",
      "Express",
      "ETag",
      'W/"a9b-hoMHAMY1AnvTcfXX7ltKTbgrkRo"',
    ],
  );
