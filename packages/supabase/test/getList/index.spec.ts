import type { SupabaseClient } from "@supabase/supabase-js";
import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getList", () => {
  it("correct response", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
    });

    expect(data[0]["id"]).toBe(1);
    expect(data[0]["title"]).toBe("Black Psorotichia Lichen");
    expect(total).toBe(20);
  });

  it("correct response with metadata select", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      meta: {
        select: "title",
      },
    });

    expect(Object.keys(data[0]).length).toBe(1);
    expect(data[0]["title"]).toBe("Black Psorotichia Lichen");
    expect(total).toBe(20);
  });

  it("correct response with metadata count", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      meta: {
        count: "estimated",
      },
    });

    expect(data[0]["id"]).toBe(1);
    expect(data[0]["title"]).toBe("Black Psorotichia Lichen");
    expect(total).toBe(20);
  });

  it("correct sorting response", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
    });

    expect(data[0]["id"]).toBe(16);
    expect(data[0]["title"]).toBe("Anopteris");
    expect(total).toBe(20);
  });

  describe("Supabase order", () => {
    const mockSupabaseOrder = vi.fn();
    const mockSupabaseClient = {
      select: () => mockSupabaseClient,
      from: () => mockSupabaseClient,
      range: () => mockSupabaseClient,
      schema: () => mockSupabaseClient,
      order: mockSupabaseOrder,
    } as unknown as SupabaseClient;

    it("correct sorting object with foreignTable", async () => {
      await dataProvider(mockSupabaseClient).getList({
        resource: "posts",
        sorters: [
          {
            field: "categories.title",
            order: "asc",
          },
        ],
      });
      expect(mockSupabaseOrder).toHaveBeenCalledWith("title", {
        ascending: true,
        foreignTable: "categories",
      });
    });

    it("correct sorting object with nested foreignTable", async () => {
      await dataProvider(mockSupabaseClient).getList({
        resource: "posts",
        sorters: [
          {
            field: "categories.tags.title",
            order: "asc",
          },
        ],
      });
      expect(mockSupabaseOrder).toHaveBeenCalledWith("title", {
        ascending: true,
        foreignTable: "categories.tags",
      });
    });

    it("correct sorting object without foreignTable", async () => {
      await dataProvider(mockSupabaseClient).getList({
        resource: "posts",
        sorters: [
          {
            field: "title",
            order: "asc",
          },
        ],
      });
      expect(mockSupabaseOrder).toHaveBeenCalledWith("title", {
        ascending: true,
      });
    });
  });
});
describe("filtering", () => {
  it("eq operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "title",
          operator: "eq",
          value: "Basil Mountainmint",
        },
      ],
    });
    expect(data[0]["title"]).toBe("Basil Mountainmint");
    expect(total).toBe(1);
  });

  it("ne operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "title",
          operator: "ne",
          value: "Basil Mountainmint",
        },
      ],
    });
    expect(data[0]["title"]).not.toBe("Basil Mountainmint");
    expect(total).toBe(19);
  });

  it("lt operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "id",
          operator: "lt",
          value: 3,
        },
      ],
    });
    expect(data[0]["id"]).toBe(1);
    expect(data[1]["id"]).toBe(2);
    expect(total).toBe(2);
  });

  it("gt operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "id",
          operator: "gt",
          value: 3,
        },
      ],
    });
    expect(data[0]["id"]).toBe(4);
    expect(data[1]["id"]).toBe(5);
    expect(total).toBe(17);
  });

  it("lte operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "id",
          operator: "lte",
          value: 2,
        },
      ],
    });
    expect(data[0]["id"]).toBe(1);
    expect(data[1]["id"]).toBe(2);
    expect(total).toBe(2);
  });

  it("gte operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "id",
          operator: "gte",
          value: 20,
        },
      ],
    });

    expect(data[0]["id"]).toBe(20);
    expect(total).toBe(1);
  });

  it("in operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "id",
          operator: "in",
          value: ["2", "3"],
        },
      ],
    });

    expect(data[0]["id"]).toBe(2);
    expect(data[1]["id"]).toBe(3);
    expect(total).toBe(2);
  });

  it("contains operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "title",
          operator: "contains",
          value: "Basil",
        },
      ],
    });

    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Basil Mountainmint");
    expect(total).toBe(1);
  });

  it("containss operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "title",
          operator: "containss",
          value: "Basil",
        },
      ],
    });

    expect(data[0]["title"]).toBe("Basil Mountainmint");
    expect(total).toBe(1);
  });

  it("null operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "content",
          operator: "null",
          value: null,
        },
      ],
    });

    expect(data).toHaveLength(0);
    expect(total).toBe(0);
  });

  it("or operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          operator: "or",
          value: [
            {
              field: "title",
              operator: "eq",
              value: "Dust Lichen",
            },
            {
              field: "title",
              operator: "eq",
              value: "Black Psorotichia Lichen",
            },
          ],
        },
      ],
    });

    expect(data[0]["title"]).toBe("Black Psorotichia Lichen");
    expect(data[1]["title"]).toBe("Dust Lichen");
    expect(total).toBe(2);
  });

  it("ina operator should work correctly with or", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          operator: "or",
          value: [
            {
              field: "id",
              operator: "eq",
              value: "2",
            },
            {
              field: "tags",
              operator: "ina",
              value: ["recipes", "personal", "food"],
            },
          ],
        },
      ],
    });

    expect(data[0]["title"]).toBe("Oakwoods Prairie Clover");
    expect(data[1]["title"]).toBe("Samsung Galaxy S21");
    expect(data[2]["title"]).toBe("Black Psorotichia Lichen");
    expect(total).toBe(3);
  });

  it("ina operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "tags",
          operator: "ina",
          value: ["health", "travel"],
        },
      ],
    });

    expect(data[0]["id"]).toBe(6);
    expect(data[1]["id"]).toBe(2);
    expect(data[2]["id"]).toBe(1);
    expect(total).toBe(3);
  });

  it("nina operator should work correctly", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          field: "tags",
          operator: "nina",
          value: ["lifestyle", "personal"],
        },
      ],
    });

    expect(data[0]["id"]).toBe(7);
    expect(data[1]["id"]).toBe(8);
    expect(data[2]["id"]).toBe(11);
    expect(data[3]["id"]).toBe(5);
    expect(data[4]["id"]).toBe(2);
    expect(total).toBe(5);
  });

  it("nina operator should work correctly with or", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          operator: "or",
          value: [
            {
              field: "tags",
              operator: "ina",
              value: ["technology", "education"],
            },
            {
              field: "tags",
              operator: "nina",
              value: ["lifestyle", "personal"],
            },
          ],
        },
      ],
    });

    expect(data[0]["title"]).toBe("Sickle Island Spleenwort");
    expect(data[1]["title"]).toBe("Oakwoods Prairie Clover");
    expect(data[2]["title"]).toBe("Funck's Wart Lichen");
    expect(data[3]["title"]).toBe("test");
    expect(data[4]["title"]).toBe("Samsung Galaxy S21");
    expect(data[5]["title"]).toBe("Black Psorotichia Lichen");
    expect(total).toBe(6);
  });

  it("contains operator should work correctly with or", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          operator: "or",
          value: [
            {
              field: "title",
              operator: "contains",
              value: "Black Psorotichia",
            },
            {
              field: "content",
              operator: "contains",
              value: "Sed sagittis",
            },
          ],
        },
      ],
    });

    expect(data).toHaveLength(2);
    expect(data[0].title).toBe("Black Psorotichia Lichen");
    expect(data[1].title).toBe("Dust Lichen");
    expect(total).toBe(2);
  });

  it("in operator should work correctly with or", async () => {
    const { data, total } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      filters: [
        {
          operator: "or",
          value: [{ field: "id", operator: "in", value: [1, 2] }],
        },
      ],
    });

    expect(data).toHaveLength(2);
    expect(data[0].title).toBe("Black Psorotichia Lichen");
    expect(data[1].title).toBe("Great Plains Flatsedge");
    expect(total).toBe(2);
  });

  it("should change schema", async () => {
    const { data } = await dataProvider(supabaseClient).getList({
      resource: "posts",
      meta: {
        schema: "public",
        select: "*",
      },
    });

    expect(data.length).toBeGreaterThan(0);

    const promise = dataProvider(supabaseClient).getList({
      resource: "products",
      meta: {
        schema: "private",
      },
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({ code: "PGRST106" }),
    );
  });
});
