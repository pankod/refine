import nock from "nock";

nock("https://api.nestjsx-crud.refine.dev:443", { encodedQueryParams: true })
  .delete("/posts/99d8ae54-432c-48d4-a385-f0ff4665e448")
  .reply(200, "", [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Tue, 06 Apr 2021 07:16:04 GMT",
    "Content-Length",
    "0",
    "Connection",
    "close",
    "X-Powered-By",
    "Express",
  ]);
