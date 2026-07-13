import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";

describe("custom", () => {
  it("correct get response", async () => {
    try {
      await dataProvider(supabaseClient).custom!({
        url: "posts",
        method: "get",
      });
    } catch (error) {
      expect(error).toEqual(
        Error("Not implemented on refine-supabase data provider."),
      );
    }
  });
});
