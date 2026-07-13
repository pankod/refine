import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";

describe("getApiUrl", () => {
  it("throws error when called", async () => {
    expect.assertions(2);

    try {
      await dataProvider(client).getApiUrl();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty(
        "message",
        "'getApiUrl' method is not implemented on refine-appwrite data provider.",
      );
    }
  });
});
