import axios from "axios";
import { vi } from "vitest";

import JsonServer from "../../src/index";

describe("getList", () => {
  it("correct response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).getList({ resource: "posts" });

    expect(response.data[0]["id"]).toBe(1);
    expect(response.data[0]["title"]).toBe(
      "Mollitia ipsam nisi in porro velit asperiores et quaerat dolorem.",
    );
    expect(response.total).toBe(1000);
  });

  it("correct sorting response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).getList({
      resource: "posts",
      sorters: [
        {
          field: "id",
          order: "asc",
        },
      ],
    });

    expect(response.data[0]["id"]).toBe(1);
    expect(response.data[0]["title"]).toBe(
      "Mollitia ipsam nisi in porro velit asperiores et quaerat dolorem.",
    );
    expect(response.total).toBe(1000);
  });

  it("correct filter response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).getList({
      resource: "posts",
      filters: [
        {
          field: "category.id",
          operator: "eq",
          value: ["1"],
        },
      ],
    });

    expect(response.data[0]["category"]["id"]).toBe(1);
    expect(response.total).toBe(17);
  });

  it("correct filter and sort response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).getList({
      resource: "posts",
      filters: [
        {
          field: "category.id",
          operator: "eq",
          value: ["1"],
        },
      ],
      sorters: [
        {
          field: "id",
          order: "asc",
        },
      ],
    });

    expect(response.data[0]["id"]).toBe(44);
    expect(response.total).toBe(17);
  });

  it("shouldn't have '?' on request url when filters, sorters and pagination is empty", async () => {
    const mockAxios = vi.spyOn(axios, "get");

    await JsonServer("https://api.fake-rest.refine.dev", axios).getList({
      resource: "categories",
      filters: [],
      sorters: [],
      pagination: {
        mode: "off",
      },
    });

    expect(mockAxios).toHaveBeenCalledWith(
      "https://api.fake-rest.refine.dev/categories",
      {
        headers: undefined,
      },
    );

    mockAxios.mockRestore();
    mockAxios.mockClear();
  });
});
