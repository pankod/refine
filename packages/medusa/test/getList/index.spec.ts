import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("create", () => {
  it("correct response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).getList({
      resource: "products",
    });

    const { data, total } = response;

    expect(total).toBe(2);
    expect(data[0]["id"]).toBe("prod_01G79W225BGTG4DD3GAZ26DTGS");
    expect(data[0]["title"]).toBe("Medusa Coffee Mug");
    expect(data[0]["description"]).toBe("Every programmer's best friend.");
  });

  it("correct filter response", async () => {
    const response = await DataProvider(
      "https://refine-example-storefront.herokuapp.com/store",
      axios,
    ).getList({
      resource: "products",
      filters: [
        {
          field: "tags",
          operator: "eq",
          value: ["ptag_01G7CDNGXSDSDNNEMCRDEXBDXG"],
        },
      ],
    });
    const { data, total } = response;
    expect(total).toBe(1);
    expect(data[0]["id"]).toBe("prod_01G79W21Y2X62MSX7F62Z2K1GR");
    expect(data[0]["title"]).toBe("Medusa Hoodie");
    expect(data[0]["description"]).toBe(
      "Reimagine the feeling of a classic hoodie. With our cotton hoodie, everyday essentials no longer have to be ordinary.",
    );
  });
});
