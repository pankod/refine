import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

describe("custom", () => {
  const API_URL = "https://api.nestjsx-crud.refine.dev";

  it("correct get response", async () => {
    const response = await JsonServer(API_URL, axios).custom!({
      url: `${API_URL}/users`,
      method: "get",
    });

    expect(response.data[0]["id"]).toBe("35a97005-ffe9-4867-9108-58c00d8ebfa8");
    expect(response.data[0]["email"]).toBe("nolan85@hotmail.com");
  });

  it("correct filter response", async () => {
    const response = await JsonServer(API_URL, axios).custom!({
      url: `${API_URL}/users`,
      method: "get",
      filters: [
        {
          field: "email",
          operator: "eq",
          value: "nolan85@hotmail.com",
        },
      ],
    });

    expect(response.data[0]["id"]).toBe("35a97005-ffe9-4867-9108-58c00d8ebfa8");
    expect(response.data[0]["email"]).toBe("nolan85@hotmail.com");
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

    expect(response.data[0]["id"]).toBe("0396774e-c41f-41a7-98db-39e0a709ef72");

    expect(response.data[0]["email"]).toBe("margot.Ritchie@yahoo.com");
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
      id: "44e3c8e9-d95a-4423-bf9a-c40407e059af",
      firstName: "test",
      lastName: "test",
      email: "test@mail.com",
      status: true,
      createdAt: "2021-06-21T12:20:05.530Z",
      updatedAt: "2021-06-21T12:20:05.530Z",
    });
  });
});
