import nock from "nock";

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .delete("/v0/appKYl1H4k9g73sBT/posts/recJEGeL2aB5rGFbC")
  .query({})
  .reply(
    200,
    [
      "1f8b0800000000000003ab564a49cd492d494d51b22a292a4dd551ca04b2948a5293bd5cdd537d8c129d4c8bdcdd929c956a016e8d991b29000000",
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
      "Thu, 24 Jun 2021 13:19:14 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwInLaPzl4WP7sXu; path=/; expires=Fri, 24 Jun 2022 13:19:13 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "59",
      "Connection",
      "Close",
    ],
  );
