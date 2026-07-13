import dataProvider from "../../src/index";
import "./index.mock";

describe("deleteMany", () => {
  it("correct response", async () => {
    const response = await dataProvider(
      "keywoytODSr6xAqfg",
      "appKYl1H4k9g73sBT",
    ).deleteMany!({ resource: "posts", ids: ["recdgFXue7JnGD90w"] });

    const { data } = response;

    expect(data).not.toBeNull();
  });
});
