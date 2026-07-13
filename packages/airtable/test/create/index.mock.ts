import nock from "nock";

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .post("/v0/appKYl1H4k9g73sBT/posts/", {
    fields: {
      title: "foo",
      content: "bar",
      status: "published",
      category: ["recDBRJljBDFH4rIh"],
    },
  })
  .query({})
  .reply(
    200,
    [
      "1f8b0800000000000003158c3d0f82301400ffcb9bc5b4151d3aa2821227c3e4c750e8436a2a35e53118c27ff7b15eee6e02674143c4a63c16785126dbc622aff7b082d6a1b703e809c89147b6da10980f6468640edfb1f66ee8d0326c0ce12bc41fe8fb323b64d7d2bfb3437e4ae3b983270ba127ec89b3dac4470f33a3885cd9ca7d96b9124a266297a8b4921b2d85966a2d84b8c1fc0704ab8bf4a4000000",
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
      "Thu, 24 Jun 2021 13:10:12 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwhuRDEqN6Ub31j3; path=/; expires=Fri, 24 Jun 2022 13:10:12 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "160",
      "Connection",
      "Close",
    ],
  );
