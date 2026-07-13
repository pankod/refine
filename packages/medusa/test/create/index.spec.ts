import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("create", () => {
  it("correct response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).create({
      resource: "customers",
      variables: {
        email: "melih@pankod.dev",
        first_name: "John",
        last_name: "Doe",
        password: "melih9696",
      },
    });

    const { data } = response;

    expect(data["customer"]["first_name"]).toBe("John");
    expect(data["customer"]["last_name"]).toBe("Doe");
    expect(data["customer"]["email"]).toBe("melih@pankod.dev");
  });
});
