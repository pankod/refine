import axios from "axios";

import JsonServer from "../../src/index";

describe("deleteOne", () => {
  it("correct response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).deleteOne({ resource: "posts", id: "1" });

    const { data } = response;

    expect(data).toEqual({});
  });
});
