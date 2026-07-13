import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

describe("updateMany", () => {
  it("correct response", async () => {
    const { data } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).updateMany!({
      resource: "posts",
      ids: ["f1d6e030-4d70-44d4-98dd-8786f197c640"],
      variables: {
        title: "updated-title-1",
      },
    });

    expect(data[0]["title"]).toBe("updated-title-1");
  });
});
