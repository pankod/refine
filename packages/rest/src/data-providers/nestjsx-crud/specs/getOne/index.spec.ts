import "./index.mock";
import { nestjsxCrudDataProvider } from "..";

describe("getOne", () => {
  it("correct response", async () => {
    const { data } = await nestjsxCrudDataProvider.getOne({
      resource: "posts",
      id: "6536e986-e500-4933-b154-b51d60d702c2",
    });

    expect(data.id).toBe("6536e986-e500-4933-b154-b51d60d702c2");
    expect(data.title).toBe("Refined productize SMS");
  });
});
