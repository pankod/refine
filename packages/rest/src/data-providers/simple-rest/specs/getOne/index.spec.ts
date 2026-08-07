import { simpleRestDataProvider } from "..";
import "./index.mock";

describe("getOne", () => {
  it("correct response", async () => {
    const response = await simpleRestDataProvider.getOne({
      resource: "posts",
      id: "1",
    });

    const { data } = response;

    expect(data.id).toBe(1);
    expect(data.title).toBe(
      "Deleniti et quasi architecto hic quam et tempora vero quo.",
    );
  });
});
