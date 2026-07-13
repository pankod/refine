import nock from "nock";

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .get("/v0/appKYl1H4k9g73sBT/posts/recLKRioqifTrPUIz")
  .query({})
  .reply(
    200,
    [
      "1f8b08000000000000031dcb410bc2201880e1bf52df790b958cf038c6d8aa430c23283a0cfd560e43523bd4d87fcf757edf6704a341804775d8b7c6bd4c2ffdf1d47c2183dea0d501c4082176f11dfedb802aa24e557511efce7f405c675d16edce0e4559d56bdf3ce0964134d16232355aeb1667e7ad5ec294a0c744b534cfb932c2684e3639e59252c1b8e0db1521e402d30fb10f929e9a000000",
    ],
    [
      "access-control-allow-headers",
      "authorization,content-length,content-type,user-agent,x-airtable-application-id,x-airtable-user-agent,x-api-version,x-requested-with",
      "access-control-allow-methods",
      "DELETE,GET,OPTIONS,PATCH,POST,PUT",
      "access-control-allow-origin",
      "*",
      "airtable-uncompressed-content-length",
      "154",
      "content-encoding",
      "gzip",
      "Content-Type",
      "application/json; charset=utf-8",
      "Date",
      "Thu, 24 Jun 2021 13:21:53 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwQBAba4kMeu0MpF; path=/; expires=Fri, 24 Jun 2022 13:21:53 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "156",
      "Connection",
      "Close",
    ],
  );
