import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("update", () => {
  it("correct response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).updateMany!({
      resource: "customers",
      ids: ["me"],
      variables: {
        first_name: "John",
        last_name: "Doe",
      },
    });

    const customer = response.data[0].customer;

    expect(customer["id"]).toBe("cus_01G8GCWQX1EN8CF7PX2W3HEGYM");
    expect(customer["first_name"]).toBe("John");
    expect(customer["last_name"]).toBe("Doe");
  });
});
