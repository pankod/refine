import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

describe("custom", () => {
  const API_URL = "https://refine-example-storefront.herokuapp.com/store";

  it("correct get response", async () => {
    const response = await DataProvider(API_URL, axios).custom!({
      url: `${API_URL}/customers/me`,
      method: "get",
    });

    const { customer } = response.data;

    expect(customer["id"]).toBe("cus_01G8GCWQX1EN8CF7PX2W3HEGYM");
    expect(customer["email"]).toBe("melih@refine.dev");
  });

  it("correct filter response", async () => {
    const response = await DataProvider(API_URL, axios).custom!({
      url: `${API_URL}/products`,
      method: "get",
      filters: [
        {
          field: "handle",
          operator: "eq",
          value: "hoodie",
        },
      ],
    });

    const { products } = response.data;

    expect(products[0].id).toBe("prod_01G79W21Y2X62MSX7F62Z2K1GR");
  });

  it("correct post request", async () => {
    const response = await DataProvider(API_URL, axios).custom!({
      url: `${API_URL}/customers/me/addresses`,
      method: "post",
      payload: {
        address: {
          first_name: "John",
          last_name: "Doe",
          address_1: "123 Main St",
          city: "New York",
          country_code: "US",
          postal_code: "10001",
        },
      },
    });

    const { customer } = response.data;
    const shippingAddress = customer["shipping_addresses"][0];

    expect(shippingAddress["first_name"]).toEqual("John");
    expect(shippingAddress["last_name"]).toEqual("Doe");
    expect(shippingAddress["address_1"]).toEqual("123 Main St");
    expect(shippingAddress["country_code"]).toEqual("us");
    expect(shippingAddress["postal_code"]).toEqual("10001");
  });

  it("correct filter response", async () => {
    const response = await DataProvider(API_URL, axios).custom!({
      url: `${API_URL}/customers/me/addresses/addr_01G8ZR6E99AGX7VJPFH4ATJF88`,
      method: "delete",
    });

    const shippingAddresses = response.data["customer"]["shipping_addresses"];

    expect(shippingAddresses).toEqual([]);
  });
});
