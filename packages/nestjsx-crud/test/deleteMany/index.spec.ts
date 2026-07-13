import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

describe("deleteMany", () => {
  it("correct response", async () => {
    const response = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).deleteMany!({
      resource: "posts",
      ids: ["0916d7a2-0675-44f7-af5e-183a701ce1d8"],
    });

    const { data } = response;

    expect(data).toEqual([""]);
  });
});
