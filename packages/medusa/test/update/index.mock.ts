import nock from "nock";

nock("https://refine-example-storefront.herokuapp.com:443", {
  encodedQueryParams: true,
})
  .post("/store/customers/me", { first_name: "Joe", last_name: "Blow" })
  .reply(
    200,
    {
      customer: {
        id: "cus_01G8GCWQX1EN8CF7PX2W3HEGYM",
        created_at: "2022-07-21T12:49:32.059Z",
        updated_at: "2022-07-27T09:45:08.193Z",
        deleted_at: null,
        email: "melih@refine.dev",
        first_name: "Joe",
        last_name: "Blow",
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
      'W/"150-mCN8B41PlcjOD+Rdmj84nD11p6A"',
      "Date",
      "Wed, 27 Jul 2022 09:45:08 GMT",
      "Via",
      "1.1 vegur",
    ],
  );
