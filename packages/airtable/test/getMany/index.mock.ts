import nock from "nock";

nock("https://api.airtable.com:443", { encodedQueryParams: true })
  .get("/v0/appKYl1H4k9g73sBT/posts")
  .query({ pageSize: "100" })
  .reply(
    200,
    [
      "1f8b080000000000000395905d6b83301486ff4a974b69875a959acb526aed1c88d875747a114d5c53b2a48be9585bf4b72f6eeca3e0608373111e5e4e9ef79c8124a590b806f0e10c2806b0039302c55e54851b278d571118828a12d665ce4051c5884e5542685e2ba40e9a83fda160b4de12ac6129b8225c695a2099f18e20451e853cea4fbaf577c151be24cbc05fdfeed51ce48d4e48a23338a54fdd72dbb4ad91e98d6c27b5c6d0f4a133b9364d73039ae1b7a41f14f7d1097bf8953b21bb90ecd7ba94984d9325db4d67f38523c32dc87f7aa31aebc978db7ebcf4b46dc6336e185f0019c67bb7cf832c086362b01692e1c1f80afcdac97253cb82b60bdd9e4ed14d42c533ad5219afc2537f274976a4547fabd423f72fb5bc7903b0079a9c21020000",
    ],
    [
      "access-control-allow-headers",
      "authorization,content-length,content-type,user-agent,x-airtable-application-id,x-airtable-user-agent,x-api-version,x-requested-with",
      "access-control-allow-methods",
      "DELETE,GET,OPTIONS,PATCH,POST,PUT",
      "access-control-allow-origin",
      "*",
      "airtable-uncompressed-content-length",
      "545",
      "content-encoding",
      "gzip",
      "Content-Type",
      "application/json; charset=utf-8",
      "Date",
      "Thu, 24 Jun 2021 13:20:40 GMT",
      "Server",
      "Tengine",
      "Set-Cookie",
      "brw=brwNd7NWRhWftbS0Q; path=/; expires=Fri, 24 Jun 2022 13:20:40 GMT; domain=.airtable.com; samesite=none; secure",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
      "Vary",
      "Accept-Encoding",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "DENY",
      "Content-Length",
      "294",
      "Connection",
      "Close",
    ],
  );
