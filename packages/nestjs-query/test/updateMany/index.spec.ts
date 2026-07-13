import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("updateMany", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).updateMany!({
      resource: "blog_posts",
      ids: ["1", "2"],
      variables: {
        title: "updated-foo",
        content: "updated-bar",
        categoryId: "2",
        status: "PUBLISHED",
      },

      meta: {
        fields: ["id", "title", "content", { category: ["id"] }, "status"],
      },
    });

    expect(data[0]["id"]).toEqual("1");
    expect(data[0]["title"]).toEqual("updated-foo");
    expect(data[0]["content"]).toEqual("updated-bar");
    expect(data[0]["category"].id).toEqual("2");
    expect(data[0]["status"]).toEqual("PUBLISHED");

    expect(data[1]["id"]).toEqual("2");
    expect(data[1]["title"]).toEqual("updated-foo");
    expect(data[1]["content"]).toEqual("updated-bar");
    expect(data[1]["category"].id).toEqual("2");
    expect(data[1]["status"]).toEqual("PUBLISHED");
  });

  it("correct response without meta", async () => {
    const { data } = await dataProvider(client).updateMany!({
      resource: "blog_posts",
      ids: ["1", "2"],
      variables: {
        title: "updated-foo-2",
        content: "updated-bar-2",
        categoryId: "3",
        status: "PUBLISHED",
      },
    });

    expect(data[0]["id"]).toEqual("1");
    expect(data[1]["id"]).toEqual("2");
  });
});
