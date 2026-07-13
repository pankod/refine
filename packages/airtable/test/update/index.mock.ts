import nock from "nock";

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .patch("/v0/appKYl1H4k9g73sBT/posts/recLKRioqifTrPUIz", {
    fields: { title: "Hello World!!" },
  })
  .query({})
  .reply(
    200,
    [
      "1f8b08000000000000031dcb410bc2201880e1bfd2bef3162a19e1718cd8aa430c23283a0cfd560e43523bd4d87fcf757edf6704a341804775d8b7c6bd4c2ffdf1d47c2187dea0d501c4082176f11dfedb802aa24e557511efce7f405c675d95edce0e65b5ad57be79c02d8768a2c5646ab4d62dcece5b9d653025e931592dcd73ce8c305a907541b9a454302ef8664908b9c0f4030447c06c9b000000",
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
      "Thu, 24 Jun 2021 13:24:42 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwQrvJXnX0I6wkCt; path=/; expires=Fri, 24 Jun 2022 13:24:42 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "157",
      "Connection",
      "Close",
    ],
  );
