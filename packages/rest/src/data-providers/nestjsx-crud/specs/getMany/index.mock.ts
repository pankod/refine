import nock from "nock";

nock("https://api.nestjsx-crud.refine.dev:443", { encodedQueryParams: true })
  .get("/posts")
  .query({
    "filter%5B0%5D":
      "id%7C%7C%24in%7C%7C6536e986-e500-4933-b154-b51d60d702c2%2C7810bbc3-b133-4f85-8c6b-d7806b329f17",
  })
  .reply(
    200,
    [
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
      {
        id: "7810bbc3-b133-4f85-8c6b-d7806b329f17",
        title: "Savings Account Money Market Account Rubber",
        content:
          "Cum voluptatem nulla. Aut libero aut eius placeat aspernatur et. Qui sed quos reprehenderit quia ducimus commodi aut non dolore.\n \rAb sed consequatur delectus eos ut alias minus quaerat sed. Tempore dolor necessitatibus aut dolores ab ipsa quia et qui. Possimus voluptatibus unde omnis modi quam magni. Harum aspernatur animi magni architecto saepe. Aut tempora et id.\n \rBeatae minima eum occaecati sed. Non alias dolor eos sint commodi. Incidunt voluptatem in sed dolorem laboriosam sit quod commodi excepturi. Sunt aperiam adipisci quidem aut non et. Nisi similique magni odio ipsum. Itaque quaerat earum nesciunt iure.\n \rDolorem rerum aut laboriosam exercitationem non alias et. Quibusdam et sed est in. Odio quaerat aperiam.\n \rMolestiae perferendis maiores est cum. Est sequi dolores et. Repellat et exercitationem eos laudantium in. Eos rerum voluptatibus et est atque. Numquam vel cumque aspernatur doloremque quas labore nulla. Sunt ducimus ut architecto minima nemo mollitia veniam.\n \rVel neque beatae aut. Quia ex eveniet molestiae ut tenetur quo qui totam. Odit distinctio quae voluptatem sed. Officia sunt cumque.\n \rDeleniti commodi ut quis ut adipisci et consequuntur eveniet. Aperiam qui sunt voluptatem. Aut nihil velit similique aspernatur quibusdam error omnis ullam. Soluta omnis enim dolorem qui optio sed possimus ut.\n \rTemporibus harum nihil laborum officiis iste quo ad officiis vitae. Repellat maiores consectetur. Aperiam est explicabo esse alias. Doloremque ea dolorum reprehenderit officia. Esse a corporis a delectus perferendis impedit. Illum necessitatibus explicabo odio voluptatem totam sed odio quam.\n \rEst dignissimos sit veritatis nihil suscipit voluptatum suscipit et. Rem facilis sit consectetur facilis veritatis ex. Quo assumenda debitis ex debitis et fugiat.\n \rQuaerat non inventore totam repudiandae. Dicta dolorem occaecati et eligendi impedit rerum nisi qui illum. Ipsam excepturi unde suscipit officia quae assumenda ut.",
        slug: "savings-account-money-market-account-rubber",
        status: "passive",
        images: [
          {
            uid: "rc-upload-mfj7h4fbd4",
            name: "random-image.jpg",
            url: "https://picsum.photos/800",
            type: "image/jpeg",
            size: 141940,
            percent: 100,
            status: "done",
          },
        ],
        createdAt: "2021-04-05T17:21:03.120Z",
        updatedAt: "2021-04-05T17:21:03.424Z",
        category: {
          id: "aafa2e39-fdba-4987-bfd3-77fca8f76e89",
          title: "Haptic Montserrat Automotive",
          createdAt: "2021-04-05T17:21:03.424Z",
          updatedAt: "2021-04-05T17:21:03.424Z",
        },
        user: {
          id: "c19675a7-ab4a-48c6-8d35-1d838da3a613",
          firstName: "Brenna",
          lastName: "Sauer",
          email: "brenna.Sauer0@yahoo.com",
          status: true,
          createdAt: "2021-04-05T17:21:03.040Z",
          updatedAt: "2021-04-05T17:21:03.040Z",
        },
      },
    ],
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Tue, 06 Apr 2021 07:31:38 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "5778",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "X-Powered-By",
      "Express",
      "ETag",
      'W/"1692-Ime4tyI1Aed2XeQHcwcNB7u9vSY"',
    ],
  );
