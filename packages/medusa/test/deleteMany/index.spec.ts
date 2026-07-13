import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("deleteMany", () => {
  it("correct response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).deleteMany!({
      resource: "customers/me/addresses",
      ids: ["addr_01G8ZK9FMJG86YBDWXQ2R4FSJF"],
    });

    const shippingAddresses =
      response.data[0]["customer"]["shipping_addresses"];

    expect(shippingAddresses).toEqual([]);
  });
});
