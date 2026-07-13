import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("updateMany", () => {
  it("correct response with `select`", async () => {
    const { data } = await dataProvider(supabaseClient).updateMany!({
      resource: "posts",
      ids: [5],
      variables: {
        title: "test",
        categoryId: 12,
        content: "test content",
      },
      meta: {
        select: "*",
      },
    });

    expect(data[0]).toEqual(
      expect.objectContaining({
        id: 5,
        title: "test",
        categoryId: 12,
        content: "test content",
      }),
    );
  });

  it("should change schema", async () => {
    const { data } = await dataProvider(supabaseClient).updateMany({
      resource: "posts",
      ids: [1, 2],
      variables: {
        title: "Samsung Galaxy S21",
      },
      meta: {
        schema: "public",
        select: "*",
      },
    });

    expect(data[0]).toEqual(
      expect.objectContaining({ id: 1, title: "Samsung Galaxy S21" }),
    );
    expect(data[1]).toEqual(
      expect.objectContaining({ id: 2, title: "Samsung Galaxy S21" }),
    );

    const promise = dataProvider(supabaseClient).updateMany({
      resource: "posts",
      ids: [1, 2],
      variables: {
        title: "foo",
      },
      meta: {
        schema: "private",
      },
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({ code: "PGRST106" }),
    );
  });
});
