import nock from "nock";
import url from "url";

const commonHeaders = [
  "access-control-allow-headers",
  "authorization,content-length,content-type,user-agent,x-airtable-application-id,x-airtable-user-agent,x-api-version,x-requested-with",
  "access-control-allow-methods",
  "DELETE,GET,OPTIONS,PATCH,POST,PUT",
  "access-control-allow-origin",
  "*",
  "airtable-uncompressed-content-length",
  "380",
  "Content-Type",
  "application/json; charset=utf-8",
  "Date",
  "Thu, 24 Jun 2021 12:24:32 GMT",
  "Server",
  "Tengine",
  "Set-Cookie",
  "brw=brwHislGvzT3Ws3Yf; path=/; expires=Fri, 24 Jun 2022 12:24:32 GMT; domain=.airtable.com; samesite=none; secure",
  "Strict-Transport-Security",
  "max-age=31536000; includeSubDomains; preload",
  "Vary",
  "Accept-Encoding",
  "X-Content-Type-Options",
  "nosniff",
  "X-Frame-Options",
  "DENY",
  "Content-Length",
  "233",
  "Connection",
  "Close",
];

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .persist()
  .get("/v0/appKYl1H4k9g73sBT/posts")
  .query((query) => {
    if (query.pageSize !== "100") return false;
    if (query.filterByFormula === undefined) return false;

    return true;
  })
  .reply(
    200,
    function () {
      const parsed = new url.URL(this.req.path, "http://example.com");
      const query = parsed.searchParams.get("filterByFormula");

      return JSON.stringify({
        offset: 0,
        records: [
          {
            fields: {
              query,
            },
          },
        ],
      });
    },
    commonHeaders,
  );

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .get("/v0/appKYl1H4k9g73sBT/posts")
  .query({ pageSize: "100" })
  .reply(
    200,
    [
      "1f8b0800000000000003954fc18ac23014fc157dc7a292562bdaa3c86a570f2215c5ad87da3cd7484cd634825aecb7fb82a0c74598c3639899375382c15c1b5e40f45382e01039a23fdaaea637dee517d58925346027503a4d09565889a41aa394bab6d446f25abb4e923cb3f8abcd95825cc47030ff9687c1f06bdc31f11e360d286c66cf94017fe7ad14c51eb9736965515962b38213525555cf8b5055a94a95e7bd88ccf3520577b219a4773c1147d7256081df64dda61f26be1f056114f65a8cb13529df9ba693b9d027b14bcc6c11dffedbf4d9228307cca9cf27d536f7073da8e6fb7c010000",
    ],
    [
      "access-control-allow-headers",
      "authorization,content-length,content-type,user-agent,x-airtable-application-id,x-airtable-user-agent,x-api-version,x-requested-with",
      "access-control-allow-methods",
      "DELETE,GET,OPTIONS,PATCH,POST,PUT",
      "access-control-allow-origin",
      "*",
      "airtable-uncompressed-content-length",
      "380",
      "content-encoding",
      "gzip",
      "Content-Type",
      "application/json; charset=utf-8",
      "Date",
      "Thu, 24 Jun 2021 12:24:32 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwHislGvzT3Ws3Yf; path=/; expires=Fri, 24 Jun 2022 12:24:32 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "233",
      "Connection",
      "Close",
    ],
  );

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .get("/v0/appKYl1H4k9g73sBT/posts")
  .query({
    pageSize: "100",
    "sort%5B0%5D%5Bfield%5D": "title",
    "sort%5B0%5D%5Bdirection%5D": "desc",
  })
  .reply(
    200,
    [
      "1f8b0800000000000003958f416bc2401085ff8ace31a86ca211cd518235d64391144b1b0f4976ac2beb6ebbbb426b30bfdd490bf59243857718debc6f785381c1521b6e217aab4070881a63f5b816fa53ec52f3f49c9ca1073b81b2c954605dee4ef62776c0d221a76d993b7cd7e69b6e34743c5b2fe56116cf172393ec61db03279c44621628a5ee6cb491bc0b17020d12ca53716cb6010bfc3e1bf7fd30f5fd2808a37032608cbd52f2566dfa50bcacce7cccbfd42891edd53e4e851476ffbf6ea5560e95232cb79c94a9bafe9d48759da94c79de9f917b5ea6a0f5a3cef0ae9fb6972ba8a00e5b7c010000",
    ],
    [
      "access-control-allow-headers",
      "authorization,content-length,content-type,user-agent,x-airtable-application-id,x-airtable-user-agent,x-api-version,x-requested-with",
      "access-control-allow-methods",
      "DELETE,GET,OPTIONS,PATCH,POST,PUT",
      "access-control-allow-origin",
      "*",
      "airtable-uncompressed-content-length",
      "380",
      "content-encoding",
      "gzip",
      "Content-Type",
      "application/json; charset=utf-8",
      "Date",
      "Thu, 24 Jun 2021 13:07:26 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brw0sykMWa9glzNWF; path=/; expires=Fri, 24 Jun 2022 13:07:25 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "237",
      "Connection",
      "Close",
    ],
  );
