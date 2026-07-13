import nock from "nock";

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .delete("/v0/appKYl1H4k9g73sBT/posts")
  .query({ "records%5B%5D": "recdgFXue7JnGD90w" })
  .reply(
    200,
    [
      "1f8b0800000000000003ab562a4a4dce2f4a2956b28aae564a49cd492d494d51b22a292a4dd551ca04b240f229e96e11a5a9e65e79ee2e9606e54ab5b1b5002d0259eb37000000",
    ],
    [
      "access-control-allow-headers",
      "authorization,content-length,content-type,user-agent,x-airtable-application-id,x-airtable-user-agent,x-api-version,x-requested-with",
      "access-control-allow-methods",
      "DELETE,GET,OPTIONS,PATCH,POST,PUT",
      "access-control-allow-origin",
      "*",
      "content-encoding",
      "gzip",
      "Content-Type",
      "application/json; charset=utf-8",
      "Date",
      "Thu, 24 Jun 2021 13:17:00 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwTjdQAZbqbk0xGk; path=/; expires=Fri, 24 Jun 2022 13:17:00 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "71",
      "Connection",
      "Close",
    ],
  );
