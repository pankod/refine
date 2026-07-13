import nock from "nock";

nock("https://refine-example-storefront.herokuapp.com:443", {
  encodedQueryParams: true,
})
  .post("/store/customers", {
    email: "melih@pankod.dev",
    first_name: "John",
    last_name: "Doe",
    password: "melih9696",
  })
  .reply(
    200,
    {
      customer: {
        id: "cus_01G8XE41VG6HP5EE4XEQQD1YK6",
        created_at: "2022-07-26T14:21:07.815Z",
        updated_at: "2022-07-26T14:21:07.815Z",
        deleted_at: null,
        email: "melih@pankod.dev",
        first_name: "John",
        last_name: "Doe",
        billing_address_id: null,
        phone: null,
        has_account: true,
        metadata: null,
        shipping_addresses: [],
        billing_address: null,
      },
    },
    [
      "Server",
      "Cowboy",
      "Connection",
      "close",
      "X-Powered-By",
      "Express",
      "Vary",
      "Origin",
      "Access-Control-Allow-Credentials",
      "true",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "336",
      "Etag",
      'W/"150-hEzhKUREo99+Pz02ko0QsLJ1M+k"',
      "Set-Cookie",
      "connect.sid=s%3AcgwfOVV47QrjFqPfyMxN6TqFOVKTLZPj.ApeBjENOF58To3guqq3qFmfUHrK%2Bll5pRnXNWF7D3V8; Path=/; Expires=Wed, 27 Jul 2022 00:21:07 GMT; HttpOnly; Secure; SameSite=None",
      "Date",
      "Tue, 26 Jul 2022 14:21:07 GMT",
      "Via",
      "1.1 vegur",
    ],
  );
