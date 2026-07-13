import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("getList", () => {
  it("correct response", async () => {
    const { data, total } = await dataProvider(client, {
      databaseId: "default",
    }).getList({
      resource: "blog_posts",
    });

    expect(data[0].id).toBe("669e49e5000fa125c6b6");
    expect(data[0].title).toBe("Deserunt Aut Atque");
    expect(total).toBe(100);
  });

  it("correct sorting response", async () => {
    const { data, total } = await dataProvider(client, {
      databaseId: "default",
    }).getList({
      resource: "blog_posts",
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
    });

    expect(data[0].id).toBe("669e49ea002a8e6aa70c");
    expect(data[0].title).toBe("Aliquid Beatae Sunt");

    expect(data[1].id).toBe("669e49eb00061b1efdba");
    expect(data[1].title).toBe("Aliquid Et Veritatis");

    expect(total).toBe(100);
  });

  it("correct multiple sorting response", async () => {
    const { data, total } = await dataProvider(client, {
      databaseId: "default",
    }).getList({
      resource: "blog_posts",
      sorters: [
        {
          field: "id",
          order: "asc",
        },
        {
          field: "title",
          order: "asc",
        },
      ],
    });

    expect(data[0].id).toBe("669e9e470013d3b23a0b");
    expect(data[0].title).toBe("Deserunt Aut Atque");

    expect(data[1].id).toBe("669e9e47001a4702e027");
    expect(data[1].title).toBe("Quidem Nihil Pariatur");

    expect(total).toBe(100);
  });

  it("correct filter response", async () => {
    const { data, total } = await dataProvider(client, {
      databaseId: "default",
    }).getList({
      resource: "blog_posts",
      filters: [
        {
          field: "id",
          operator: "eq",
          value: "669e9e56001c66a18865",
        },
      ],
    });

    expect(data[0].id).toBe("669e9e56001c66a18865");
    expect(data[0].title).toBe("Debitis Quo Fuga");
    expect(total).toBe(1);
  });

  it("throws when given an unsupported operator", async () => {
    expect.assertions(2);

    try {
      await dataProvider(client, {
        databaseId: "default",
      }).getList({
        resource: "blog_posts",
        filters: [
          {
            field: "id",
            operator: "in",
            value: "632456c5998583bcb6d3",
          },
        ],
      });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty("message", "Operator in is not supported");
    }
  });
});
