import "./index.mock";
import { nestjsxCrudDataProvider } from "..";

describe("getMany", () => {
  it("correct response", async () => {
    const { data } = await nestjsxCrudDataProvider.getMany!({
      resource: "posts",
      ids: [
        "6536e986-e500-4933-b154-b51d60d702c2",
        "7810bbc3-b133-4f85-8c6b-d7806b329f17",
      ],
    });

    expect(data[0]["id"]).toBe("6536e986-e500-4933-b154-b51d60d702c2");
    expect(data[1]["id"]).toBe("7810bbc3-b133-4f85-8c6b-d7806b329f17");
    expect(data.length).toBe(2);
  });
});
