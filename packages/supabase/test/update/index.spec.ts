import { dataProvider } from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("update", () => {
  it("correct response with `select`", async () => {
    const { data } = await dataProvider(supabaseClient).update({
      id: 1,
      resource: "posts",
      variables: {
        title: "test",
        categoryId: 5,
        content: "test content",
      },
      meta: {
        select: "*",
      },
    });

    expect(data).toEqual(
      expect.objectContaining({
        id: 1,
        title: "test",
        categoryId: 5,
        content: "test content",
      }),
    );
  });

  it("should change schema", async () => {
    const id = 1;

    const { data } = await dataProvider(supabaseClient).update({
      id,
      resource: "posts",
      variables: {
        title: "IPhone 16",
      },
      meta: {
        select: "*",
      },
    });

    expect(data).toEqual(
      expect.objectContaining({ id: 1, title: "IPhone 16" }),
    );

    const promise = dataProvider(supabaseClient).update({
      id,
      resource: "posts",
      variables: {
        title: "IPhone 16",
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
