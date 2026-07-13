import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("getMany", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).getMany!({
      resource: "blog_posts",
      ids: ["1", "2"],
      meta: {
        fields: ["id"],
      },
    });

    expect(data[0]["id"]).toEqual("1");

    expect(data[1]["id"]).toEqual("2");
  });
});
