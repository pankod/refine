import nock from "nock";
import { dataProvider } from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getOne", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(supabaseClient).getOne({
      resource: "posts",
      id: "2",
    });

    expect(data.title).toBe("Great Plains Flatsedge");
    expect(data.categoryId).toEqual(8);
  });

  it("correct response with select metadata", async () => {
    const { data } = await dataProvider(supabaseClient).getOne({
      resource: "posts",
      id: "3",
      meta: {
        select: "title",
      },
    });

    expect(Object.keys(data).length).toBe(1);
    expect(data.title).toBe("Copperweed");
  });
});
