import nock from "nock";

nock("https://api.fake-rest.refine.dev:443", { encodedQueryParams: true })
  .get("/posts/1")
  .reply(
    200,
    {
      id: 1,
      title: "Deleniti et quasi architecto hic quam et tempora vero quo.",
      slug: "nobis-aut-eligendi",
      content:
        "Accusantium sed nam odio ut non qui. Maxime quaerat sed ducimus corrupti consequatur. Facere numquam ut reprehenderit quaerat quia. Recusandae quibusdam asperiores atque architecto quod praesentium sit non. Aut neque repellat veniam veritatis qui et vel alias debitis. Amet eius omnis dolores. Sint sed magni. Dolor eius maiores asperiores et. Et modi illum eius quisquam maxime at vel qui. Sit dolore officiis aliquid quia labore.",
      categoryId: 20,
      status: "active",
      userId: 16,
      tags: [15, 36, 46],
      image: [],
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Tue, 30 Mar 2021 12:00:24 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "679",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "X-Powered-By",
      "Express",
      "Vary",
      "Origin, Accept-Encoding",
      "Access-Control-Allow-Credentials",
      "true",
      "Cache-Control",
      "no-cache",
      "Pragma",
      "no-cache",
      "Expires",
      "-1",
      "X-Content-Type-Options",
      "nosniff",
      "ETag",
      'W/"2a7-a0rGaWRcFw0EdW6V+OnQR4/JLnk"',
    ],
  );
