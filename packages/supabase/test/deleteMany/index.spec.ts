import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("deleteMany", () => {
  it("correct response", async () => {
    const promise = dataProvider(supabaseClient).deleteMany!({
      resource: "posts",
      ids: [1],
    });

    await expect(promise).resolves.not.toThrow();
  });

  it("should change schema", async () => {
    const ids = [1];

    const promise = dataProvider(supabaseClient).deleteMany({
      resource: "posts",
      ids,
    });

    await expect(promise).resolves.not.toThrow();

    const promise2 = dataProvider(supabaseClient).deleteMany({
      resource: "posts",
      ids: [123],
      meta: {
        schema: "private",
      },
    });

    await expect(promise2).rejects.toEqual(
      expect.objectContaining({ code: "PGRST106" }),
    );
  });
});
