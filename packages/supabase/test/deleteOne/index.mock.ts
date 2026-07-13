import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/posts")
  .query({ id: "eq.27" })
  .reply(204, "", [
    "Date",
    "Thu, 25 Apr 2024 09:08:08 GMT",
    "Connection",
    "close",
    "Content-Range",
    "*/*",
    "CF-Ray",
    "879d2fd0396e7237-IST",
    "CF-Cache-Status",
    "DYNAMIC",
    "Access-Control-Allow-Origin",
    "*",
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains",
    "Via",
    "kong/2.8.1",
    "sb-gateway-version",
    "1",
    "x-kong-proxy-latency",
    "0",
    "x-kong-upstream-latency",
    "3",
    "Vary",
    "Accept-Encoding",
    "Server",
    "cloudflare",
    "alt-svc",
    'h3=":443"; ma=86400',
  ]);

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/posts")
  .query({ id: "eq.40" })
  .reply(204, "", [
    "Date",
    "Thu, 25 Apr 2024 09:08:08 GMT",
    "Connection",
    "close",
    "Content-Range",
    "*/*",
    "CF-Ray",
    "879d2fd028db724c-IST",
    "CF-Cache-Status",
    "DYNAMIC",
    "Access-Control-Allow-Origin",
    "*",
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains",
    "Via",
    "kong/2.8.1",
    "sb-gateway-version",
    "1",
    "x-kong-proxy-latency",
    "0",
    "x-kong-upstream-latency",
    "4",
    "Vary",
    "Accept-Encoding",
    "Server",
    "cloudflare",
    "alt-svc",
    'h3=":443"; ma=86400',
  ]);

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/posts")
  .query({ id: "eq.41" })
  .reply(
    406,
    {
      code: "PGRST106",
      details: null,
      hint: null,
      message: "The schema must be one of the following: public, storage",
    },
    [
      "Date",
      "Thu, 25 Apr 2024 09:08:08 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "CF-Ray",
      "879d2fd1bfa37248-IST",
      "CF-Cache-Status",
      "DYNAMIC",
      "Access-Control-Allow-Origin",
      "*",
      "Strict-Transport-Security",
      "max-age=15552000; includeSubDomains",
      "Via",
      "kong/2.8.1",
      "sb-gateway-version",
      "1",
      "x-kong-proxy-latency",
      "1",
      "x-kong-upstream-latency",
      "1",
      "Vary",
      "Accept-Encoding",
      "Server",
      "cloudflare",
      "alt-svc",
      'h3=":443"; ma=86400',
    ],
  );
