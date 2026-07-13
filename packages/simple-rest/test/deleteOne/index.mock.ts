import nock from "nock";

nock("https://api.fake-rest.refine.dev:443", { encodedQueryParams: true })
  .delete("/posts/1")
  .reply(200, {}, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Tue, 30 Mar 2021 12:23:06 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "2",
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
    'W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"',
  ]);
