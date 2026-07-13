import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

describe("create", () => {
  it("correct response", async () => {
    const { data } = await JsonServer(
      "https://api.nestjsx-crud.refine.dev",
      axios,
    ).create({
      resource: "posts",
      variables: {
        title: "foo",
        content: "bar",
        status: "active",
        user: {
          id: "6b67da31-2f7e-44ac-936e-18f5766252fc",
        },
        category: {
          id: "7f198377-e367-43ce-9932-d2e2572767e5",
        },
      },
    });

    expect(data["title"]).toBe("foo");
    expect(data["content"]).toBe("bar");
    expect(data["user"]["id"]).toBe("6b67da31-2f7e-44ac-936e-18f5766252fc");
    expect(data["category"]["id"]).toBe("7f198377-e367-43ce-9932-d2e2572767e5");
  });
});
