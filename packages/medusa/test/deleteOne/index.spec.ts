import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("deleteOne", () => {
  it("correct response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).deleteOne({
      resource: "customers/me/addresses",
      id: "addr_01G8ZK866E4X9034N2XM35VZ8M",
    });

    const shippingAddressesIds = response.data.customer[
      "shipping_addresses"
    ].map((address: any) => address["id"]);

    expect(shippingAddressesIds).not.toContain(
      "addr_01G8ZK866E4X9034N2XM35VZ8M",
    );
  });
});
