import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

describe("getList", () => {
  it("correct response", async () => {
    const { data, total } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).getList({ resource: "posts" });

    expect(data[0]["id"]).toBe("1b175cdc-4407-49d9-82cd-35e9f31afec2");
    expect(data[0]["title"]).toBe("User-friendly New Mexico Bedfordshire");
    expect(total).toBe(135);
  });

  it("correct sorting response", async () => {
    const { data, total } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
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

    expect(data[0]["id"]).toBe("011edb32-f071-424a-8747-81d894f52906");
    expect(data[0]["title"]).toBe("Games initiatives online");
    expect(total).toBe(135);
  });

  it("correct filter response", async () => {
    const { data, total } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).getList({
      resource: "posts",
      filters: [
        {
          field: "category.id",
          operator: "in",
          value: ["73bdc4c0-0cc2-49bb-bd6f-550deb795468"],
        },
      ],
    });

    expect(data[0]["category"]["title"]).toBe("Deposit Capacitor Hdd");
    expect(total).toBe(24);
  });

  it("correct filter and sort response", async () => {
    const { data, total } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).getList({
      resource: "posts",
      filters: [
        {
          field: "category.id",
          operator: "in",
          value: ["73bdc4c0-0cc2-49bb-bd6f-550deb795468"],
        },
      ],
      sorters: [
        {
          field: "id",
          order: "asc",
        },
      ],
    });

    expect(data[0]["title"]).toBe("Games initiatives online");
    expect(total).toBe(24);
  });

  it("or/and correct filter response", async () => {
    const { data, total } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).getList({
      resource: "posts",
      filters: [
        {
          key: "1",
          operator: "or",
          value: [
            {
              key: "1.1",
              operator: "and",
              value: [
                {
                  field: "title",
                  operator: "startswith",
                  value: "a",
                },
                {
                  field: "title",
                  operator: "contains",
                  value: "heuristic",
                },
              ],
            },
            {
              key: "1.2",
              operator: "and",
              value: [
                {
                  field: "title",
                  operator: "startswith",
                  value: "e",
                },
                {
                  field: "title",
                  operator: "contains",
                  value: "invoice",
                },
              ],
            },
          ],
        },
      ],
    });

    expect(data[0]["title"]).toBe("Engage Marshall Islands invoice");
    expect(data[1]["title"]).toBe("Avon heuristic Washington");
    expect(total).toBe(2);
  });

  it("correct response without pagination", async () => {
    const { data, total } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).getList({
      resource: "posts",
      pagination: {
        mode: "off",
      },
    });

    expect(data[0]["id"]).toBe("1b175cdc-4407-49d9-82cd-35e9f31afec2");
    expect(data[0]["title"]).toBe("User-friendly New Mexico Bedfordshire");
    expect(total).toBe(1);
  });
});
