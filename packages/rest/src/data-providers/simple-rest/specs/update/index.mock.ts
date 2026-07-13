import nock from "nock";

nock("https://api.fake-rest.refine.dev:443", { encodedQueryParams: true })
  .patch("/posts/1000", { id: 1001, title: "foo", content: "bar" })
  .reply(200, { id: 1000, title: "foo", content: "bar" }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Tue, 30 Mar 2021 11:36:34 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "54",
    "Connection",
    "close",
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
    'W/"36-Um2MA2uF6w7rTIWkUlx1wVaEBWQ"',
  ]);
