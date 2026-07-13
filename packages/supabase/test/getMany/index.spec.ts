import nock from "nock";
import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getMany", () => {
  it("correct response", async () => {
    const response = await dataProvider(supabaseClient).getMany!({
      resource: "posts",
      ids: ["2", "3"],
    });

    const { data } = response;

    expect(data[0]["id"]).toBe(2);
    expect(data[1]["id"]).toBe(3);
    expect(response.data.length).toBe(2);
  });

  it("correct response with select metadata", async () => {
    const { data } = await dataProvider(supabaseClient).getMany!({
      resource: "posts",
      ids: ["3", "4"],
      meta: {
        select: "title",
      },
    });

    expect(Object.keys(data[0]).length).toBe(1);
    expect(data[0]["title"]).toBe("Copperweed");
    expect(data[1]["title"]).toBe("Bastard Toadflax");
    expect(data.length).toBe(2);
  });

  it("should change schema", async () => {
    const { data } = await dataProvider(supabaseClient).getMany({
      resource: "posts",
      ids: [1, 2],
      meta: {
        schema: "public",
        select: "*",
      },
    });

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, title: "Black Psorotichia Lichen" }),
        expect.objectContaining({ id: 2, title: "Great Plains Flatsedge" }),
      ]),
    );

    const promise = dataProvider(supabaseClient).getMany({
      resource: "posts",
      ids: [1, 2],
      meta: {
        schema: "private",
      },
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({ code: "PGRST106" }),
    );
  });
});
