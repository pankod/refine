import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("update", () => {
  it("correct response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).update({
      resource: "customers",
      id: "me",
      variables: {
        first_name: "Joe",
        last_name: "Blow",
      },
    });

    const customer = response.data.customer;

    expect(customer["id"]).toBe("cus_01G8GCWQX1EN8CF7PX2W3HEGYM");
    expect(customer["first_name"]).toBe("Joe");
    expect(customer["last_name"]).toBe("Blow");
  });
});
