import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";

describe("getApiUrl", () => {
  it("correct get response", async () => {
    try {
      dataProvider(supabaseClient).getApiUrl();
    } catch (error) {
      expect(error).toEqual(
        Error("Not implemented on refine-supabase data provider."),
      );
    }
  });
});
