import axios from "axios";

import JsonServer from "../../src/index";

describe("getOne", () => {
  it("correct response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).getOne({ resource: "posts", id: "1" });

    const { data } = response;

    expect(data.id).toBe(1);
    expect(data.title).toBe(
      "Deleniti et quasi architecto hic quam et tempora vero quo.",
    );
  });
});
