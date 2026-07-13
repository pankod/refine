import { simpleRestDataProvider } from "..";
import "./index.mock";

describe("deleteOne", () => {
  it("correct response", async () => {
    const response = await simpleRestDataProvider.deleteOne({
      resource: "posts",
      id: "1",
    });

    const { data } = response;

    expect(data).toEqual({});
  });
});
