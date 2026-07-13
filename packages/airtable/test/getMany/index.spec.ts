import dataProvider from "../../src/index";
import "./index.mock";

describe("getMany", () => {
  it("correct response", async () => {
    const response = await dataProvider(
      "keywoytODSr6xAqfg",
      "appKYl1H4k9g73sBT",
    ).getMany!({
      resource: "posts",
      ids: ["recLKRioqifTrPUIz", "rec9GbXLzd6dxn4Il"],
    });

    const { data } = response;

    expect(data[0]["id"]).toBe("rec9GbXLzd6dxn4Il");
    expect(data[1]["id"]).toBe("recLKRioqifTrPUIz");
    expect(response.data.length).toBe(2);
  });
});
