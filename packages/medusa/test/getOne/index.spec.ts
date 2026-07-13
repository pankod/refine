import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("getOne", () => {
  it("correct response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).getOne({
      resource: "products",
      id: "prod_01G79W21Y2X62MSX7F62Z2K1GR",
    });

    const product = response.data.product;

    expect(product.id).toBe("prod_01G79W21Y2X62MSX7F62Z2K1GR");
    expect(product.title).toBe("Medusa Hoodie");
  });
});
