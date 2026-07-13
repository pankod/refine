import nock from "nock";

nock("https://api.nestjsx-crud.refine.dev:443", { encodedQueryParams: true })
  .delete("/posts/0916d7a2-0675-44f7-af5e-183a701ce1d8")
  .reply(200, "", [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Tue, 06 Apr 2021 07:14:41 GMT",
    "Content-Length",
    "0",
    "Connection",
    "close",
    "X-Powered-By",
    "Express",
  ]);
