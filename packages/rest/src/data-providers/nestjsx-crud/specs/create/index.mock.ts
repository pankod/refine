import nock from "nock";

nock("https://api.nestjsx-crud.refine.dev:443", { encodedQueryParams: true })
  .post("/posts", {
    title: "foo",
    content: "bar",
    status: "active",
    user: { id: "6b67da31-2f7e-44ac-936e-18f5766252fc" },
    category: { id: "7f198377-e367-43ce-9932-d2e2572767e5" },
  })
  .reply(
    201,
    {
      id: "fea25f72-91c9-4354-9985-e1d2140c3818",
      title: "foo",
      content: "bar",
      slug: "foo",
      status: "active",
      images: null,
      createdAt: "2021-04-06T07:11:51.200Z",
      updatedAt: "2021-04-06T07:11:51.200Z",
      category: {
        id: "7f198377-e367-43ce-9932-d2e2572767e5",
        title: "Indexing Bypassing Licensed Soft Soap",
        createdAt: "2021-04-05T17:21:02.712Z",
        updatedAt: "2021-04-05T17:21:02.712Z",
      },
      user: {
        id: "6b67da31-2f7e-44ac-936e-18f5766252fc",
        firstName: "Jamey",
        lastName: "Legros",
        email: "jamey.Legros@gmail.com",
        status: true,
        createdAt: "2021-04-05T17:21:02.630Z",
        updatedAt: "2021-04-05T17:21:02.630Z",
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Tue, 06 Apr 2021 07:11:51 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "599",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "ETag",
      'W/"257-8HUvc54NAFm1ZAPjDuWf2qwt37I"',
    ],
  );
