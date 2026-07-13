import dataProvider from "../../src/index";
import "./index.mock";

describe("getOne", () => {
  it("correct response", async () => {
    const response = await dataProvider(
      "keywoytODSr6xAqfg",
      "appKYl1H4k9g73sBT",
    ).getOne({ resource: "posts", id: "recLKRioqifTrPUIz" });

    const { data } = response;

    expect(data.title).toBe("Hello World!");
    expect(data.status).toBe("rejected");
    expect(data.category).toEqual(["recDBRJljBDFH4rIh"]);
  });
});
