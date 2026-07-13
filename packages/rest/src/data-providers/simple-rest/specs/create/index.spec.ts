import { simpleRestDataProvider } from "..";
import "./index.mock";

describe("create", () => {
  it("correct response", async () => {
    const response = await simpleRestDataProvider.create({
      resource: "posts",
      variables: { id: 1001, title: "foo", content: "bar" },
    });

    const { data } = response;

    expect(data["id"]).toBe(1001);
    expect(data["title"]).toBe("foo");
    expect(data["content"]).toBe("bar");
  });
});
