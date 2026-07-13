import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

describe("getOne", () => {
  it("correct response", async () => {
    const { data } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).getOne({
      resource: "posts",
      id: "6536e986-e500-4933-b154-b51d60d702c2",
    });

    expect(data.id).toBe("6536e986-e500-4933-b154-b51d60d702c2");
    expect(data.title).toBe("Refined productize SMS");
  });
});
