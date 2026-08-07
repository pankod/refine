import "./index.mock";
import { nestjsxCrudDataProvider } from "..";

describe("deleteOne", () => {
  it("correct response", async () => {
    const { data } = await nestjsxCrudDataProvider.deleteOne({
      resource: "posts",
      id: "99d8ae54-432c-48d4-a385-f0ff4665e448",
    });

    expect(data).toEqual(undefined);
  });
});
