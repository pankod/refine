import dataProvider from "../../src/index";
import "./index.mock";

describe("create", () => {
  it("correct response", async () => {
    const response = await dataProvider(
      "keywoytODSr6xAqfg",
      "appKYl1H4k9g73sBT",
    ).create({
      resource: "posts",
      variables: {
        title: "foo",
        content: "bar",
        status: "published",
        category: ["recDBRJljBDFH4rIh"],
      },
    });

    const { data } = response;

    expect(data["title"]).toEqual("foo");
    expect(data["status"]).toEqual("published");
    expect(data["category"]).toEqual(["recDBRJljBDFH4rIh"]);
    expect(data["content"]).toEqual("bar\n");
  });
});
