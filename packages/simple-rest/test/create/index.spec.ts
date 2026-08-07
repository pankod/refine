import "./index.mock";
import axios from "axios";

import JsonServer from "../../src/index";

describe("create", () => {
  it("correct response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).create({
      resource: "posts",
      variables: { id: 1001, title: "foo", content: "bar" },
    });

    const { data } = response;

    expect(data["id"]).toBe(1001);
    expect(data["title"]).toBe("foo");
    expect(data["content"]).toBe("bar");
  });
});
