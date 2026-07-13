import axios from "axios";

import JsonServer from "../../src/index";

describe("custom", () => {
  const API_URL = "https://api.fake-rest.refine.dev";

  it("correct get response", async () => {
    const response = await JsonServer(API_URL, axios).custom!({
      url: `${API_URL}/users`,
      method: "get",
    });

    expect(response.data[0]["id"]).toBe(1);
    expect(response.data[0]["email"]).toBe("tiana_gleason63@hotmail.com");
  });

  it("correct filter response", async () => {
    const response = await JsonServer(API_URL, axios).custom!({
      url: `${API_URL}/users`,
      method: "get",
      filters: [
        {
          field: "email",
          operator: "eq",
          value: "tiana_gleason63@hotmail.com",
        },
      ],
    });

    expect(response.data[0]["id"]).toBe(1);
    expect(response.data[0]["email"]).toBe("tiana_gleason63@hotmail.com");
  });

  it("correct sort response", async () => {
    const response = await JsonServer(API_URL, axios).custom!({
      url: `${API_URL}/users`,
      method: "get",
      sorters: [
        {
          field: "id",
          order: "asc",
        },
      ],
    });

    expect(response.data[0]["id"]).toBe(1);
  });

  it("correct post request", async () => {
    const response = await JsonServer(API_URL, axios).custom!({
      url: `${API_URL}/users`,
      method: "post",
      payload: {
        firstName: "test",
        lastName: "test",
        email: "test@mail.com",
        status: true,
      },
    });

    expect(response.data).toEqual({
      email: "test@mail.com",
      firstName: "test",
      id: 51,
      lastName: "test",
      status: true,
    });
  });
});
