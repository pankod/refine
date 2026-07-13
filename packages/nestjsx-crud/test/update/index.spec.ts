import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

describe("update", () => {
  it("correct response", async () => {
    const { data } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).update({
      resource: "posts",
      id: "0b4faa6d-6726-4967-be13-e9d05d9aef7f",
      variables: { title: "updated-title" },
    });

    expect(data["id"]).toBe("0b4faa6d-6726-4967-be13-e9d05d9aef7f");
    expect(data["title"]).toBe("updated-title");
  });
});
