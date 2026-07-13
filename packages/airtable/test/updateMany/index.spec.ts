import dataProvider from "../../src/index";
import "./index.mock";

describe("updateMany", () => {
  it("correct response", async () => {
    const response = await dataProvider(
      "keywoytODSr6xAqfg",
      "appKYl1H4k9g73sBT",
    ).updateMany!({
      resource: "posts",
      ids: ["recLKRioqifTrPUIz", "rec9GbXLzd6dxn4Il"],
      variables: {
        title: "Hello World!!!",
      },
    });

    const { data } = response;

    expect(data[0]["title"]).toBe("Hello World!!!");
    expect(data[1]["title"]).toBe("Hello World!!!");
  });
});
