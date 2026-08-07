import nock from "nock";

nock("https://api.nestjsx-crud.refine.dev:443", { encodedQueryParams: true })
  .get("/posts/6536e986-e500-4933-b154-b51d60d702c2")
  .reply(
    200,
    {
      id: "6536e986-e500-4933-b154-b51d60d702c2",
      title: "Refined productize SMS",
      content:
        "Facilis minima rerum laboriosam aspernatur a reiciendis et enim. Facilis adipisci et aliquid rerum et. Molestias suscipit molestiae explicabo porro aut. Ut fugiat odit dolorem cum cumque consequatur labore in.\n \rAccusamus laboriosam enim nulla consequuntur voluptas et quidem veniam. Et et odit molestiae et. Aut distinctio aut qui eum fugit laudantium. Quo magnam natus consequatur voluptatibus accusamus qui quidem alias. Debitis numquam voluptatem eligendi voluptas eligendi amet et qui non. Velit recusandae non aut.\n \rCommodi sunt nemo aut explicabo. Nostrum veritatis ipsum cupiditate sequi minima possimus dolor accusantium alias. Dolor aut et quisquam cupiditate.\n \rAut voluptatibus sit. Pariatur sapiente ut iste rerum labore cum aut reprehenderit a. Eligendi dolor omnis reiciendis. Sit veniam laboriosam nesciunt fuga et. Libero molestias ex et odit aut.\n \rNeque dolorem aut rem culpa inventore. Fugiat occaecati enim eveniet corrupti aliquid eveniet autem ad voluptate. Qui ut repellendus minus eveniet unde reiciendis aut. Et at quis. Et enim qui voluptas suscipit autem fuga. Omnis omnis ea molestias.\n \rOdio est est distinctio natus. Nisi dolorem non fugit quasi molestiae fugiat. Autem aspernatur explicabo voluptatem et. Fuga non accusantium omnis nobis voluptatibus quisquam eum. Nam eveniet enim sunt iusto corrupti.\n \rSint veniam molestiae beatae reprehenderit quis. Et rem reprehenderit expedita. Qui quae repellendus qui eum. Id qui non laudantium rerum laudantium optio delectus.\n \rUllam nemo eius necessitatibus. Qui dolorum accusantium dolores neque reiciendis quisquam cum. Incidunt nam modi rerum et est dolorum. Rerum voluptatem rerum excepturi odit quo maxime rerum.\n \rVoluptas earum quod totam voluptas qui. Velit libero totam ut in eos. Alias molestiae alias eum quibusdam qui voluptate ex odit. Consequuntur quaerat suscipit velit sint consequuntur dolorem et. Vitae possimus hic culpa quod eveniet eum et vitae. Facilis minus voluptatem iusto id quia magnam sit rem ab.\n \rEt qui quas quidem ut. Asperiores dolor ipsa minus assumenda molestiae quis cum perferendis. Fugit voluptates sint accusantium. Omnis adipisci laboriosam.",
      slug: "refined-productize-sms",
      status: "draft",
      images: [
        {
          uid: "rc-upload-gcyg2ny4hz",
          name: "random-image.jpg",
          url: "https://picsum.photos/800",
          type: "image/jpeg",
          size: 141940,
          percent: 100,
          status: "done",
        },
      ],
      createdAt: "2021-04-05T17:21:02.945Z",
      updatedAt: "2021-04-05T17:21:02.998Z",
      category: {
        id: "ab50ed75-e3df-477c-a8f7-e41b59848e9e",
        title: "South Carolina Refined Fresh Ball Channels",
        createdAt: "2021-04-05T17:21:02.998Z",
        updatedAt: "2021-04-05T17:21:02.998Z",
      },
      user: {
        id: "8a6066b6-8034-46a4-af6a-8a84035673c4",
        firstName: "Golda",
        lastName: "Weissnat",
        email: "golda_Weissnat0@hotmail.com",
        status: true,
        createdAt: "2021-04-05T17:21:02.758Z",
        updatedAt: "2021-04-05T17:21:02.758Z",
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Tue, 06 Apr 2021 07:33:04 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "2974",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "X-Powered-By",
      "Express",
      "ETag",
      'W/"b9e-w8MQ3McIGDL5izkphstmliwGqxQ"',
    ],
  );
