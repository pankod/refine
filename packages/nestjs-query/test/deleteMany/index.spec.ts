import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("deleteMany", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).deleteMany!({
      resource: "blog_posts",
      ids: ["37", "38"],
    });

    expect(data).toEqual([]);
  });
});
