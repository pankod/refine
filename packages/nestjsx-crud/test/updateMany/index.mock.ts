import nock from "nock";

nock("https://api.nestjsx-crud.refine.dev:443", { encodedQueryParams: true })
  .patch("/posts/f1d6e030-4d70-44d4-98dd-8786f197c640", {
    title: "updated-title-1",
  })
  .reply(
    200,
    {
      status: "published",
      id: "f1d6e030-4d70-44d4-98dd-8786f197c640",
      title: "updated-title-1",
      content:
        "Incidunt et provident beatae debitis. Ut accusantium nemo velit voluptas a in sunt. Inventore praesentium cumque nihil nostrum error esse facere officiis. Qui repudiandae et sapiente voluptas vitae aspernatur. Eligendi et illo exercitationem beatae. Assumenda labore illo temporibus odio enim ad repudiandae.\n \rEa sunt laudantium fugiat. Sed vel consequatur assumenda corporis itaque et amet dolore minima. Consectetur omnis culpa. Odio aspernatur quia est illo sit. Et nulla qui sunt voluptate.\n \rRerum qui officiis ipsa delectus vero est. Ut asperiores dolorum libero quo corrupti distinctio unde voluptate maxime. Perferendis sit sed voluptatum eaque quod aut fugiat ratione. Labore officia omnis sed magnam enim non voluptatem. Sed quis earum ipsum sint. Deleniti nulla assumenda voluptas voluptas.\n \rFugit dolore sit eos. Repellendus tempore aut aliquam esse quasi voluptate repudiandae voluptatibus. Molestiae aut quidem odio reiciendis dolorem voluptatem minus.\n \rOmnis numquam autem nobis facere aut qui dolorem. Porro ipsam aperiam itaque impedit in accusamus aliquam itaque illum. Beatae saepe et rerum est iusto.\n \rBeatae ducimus ea. Iste et ut magni fuga qui molestiae qui molestiae. Quisquam eligendi corporis hic corrupti qui incidunt asperiores.\n \rIusto qui maxime sit. Perspiciatis cumque unde voluptatem dolor. Tenetur animi ut perferendis. Voluptatem eveniet quasi. Modi voluptate ex. Sint in doloribus consequatur.\n \rEius minima et atque inventore voluptas suscipit consequatur. Ea dolore qui voluptatem nam. Molestiae qui praesentium quia amet perspiciatis reiciendis voluptatem est repellendus. Omnis et voluptates. Nam quia recusandae quisquam sequi ipsa.\n \rUt sed ut quo amet sint dolorem. Dolorem ad ut et et cum doloremque corporis. Magni vero velit.\n \rRerum corrupti sint animi. Enim ut illo sunt accusamus et laudantium asperiores consequatur enim. Dolor recusandae in rerum amet occaecati eos quod. Aut voluptatibus est ratione. Quis dolorem ullam facilis voluptatem quae.",
      slug: "updated-title-1",
      images: [
        {
          uid: "rc-upload-lodhq9a840",
          name: "random-image.jpg",
          url: "https://picsum.photos/800",
          type: "image/jpeg",
          size: 141940,
          percent: 100,
          status: "done",
        },
      ],
      createdAt: "2021-04-06T08:28:33.788Z",
      updatedAt: "2021-04-06T08:29:48.664Z",
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
      "Tue, 06 Apr 2021 08:29:48 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "2786",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "X-Powered-By",
      "Express",
      "ETag",
      'W/"ae2-uLng+BzzFBgfhm/SrfHZZvFrX9E"',
    ],
  );
