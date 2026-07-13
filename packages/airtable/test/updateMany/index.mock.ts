import nock from "nock";

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .patch("/v0/appKYl1H4k9g73sBT/posts/", {
    records: [
      { id: "recLKRioqifTrPUIz", fields: { title: "Hello World!!!" } },
      { id: "rec9GbXLzd6dxn4Il", fields: { title: "Hello World!!!" } },
    ],
  })
  .query({})
  .reply(
    200,
    [
      "1f8b0800000000000003ad8f416bc2401085ff8a996350d9042336471135ad872229169b1c6276d49575577757680de6b73b69412f3d7810e630bcf7bee14d05064b6db885f8ab02c1216e84d9db5ce8a358a7e6fd2339431bd6026593a9c0bac29dec6f6c87a5434e6e5938dc68f343371a7a349cbfcadd70349ef64cb285bc0d4e3889c44c514add5a6823b9e7797021d420c13c15fbc60f59187458bf13446910c4611447832e636c49c97bb997c9ea7376e67dfead7a89fcbfdce1b492c26e1f6b576ae55039c20acb693255d77f1b4d5d672a53be7f130adfcf143ce3a7fc720554f78d147e010000",
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
      "Thu, 24 Jun 2021 13:26:53 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwPAe5xxAm5wIYu2; path=/; expires=Fri, 24 Jun 2022 13:26:53 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "235",
      "Connection",
      "Close",
    ],
  );
