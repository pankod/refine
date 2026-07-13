import dataProvider from "../../src/index";
import "./index.mock";

describe("deleteOne", () => {
  it("correct response", async () => {
    const response = await dataProvider(
      "keywoytODSr6xAqfg",
      "appKYl1H4k9g73sBT",
    ).deleteOne({ resource: "posts", id: "recJEGeL2aB5rGFbC" });

    const { data } = response;

    expect(data).not.toBeNull();
  });
});
