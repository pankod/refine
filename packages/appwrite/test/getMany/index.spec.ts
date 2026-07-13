import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("getMany", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).getMany!({
      resource: "blog_posts",
      ids: ["669e49f2003b4ed88818", "669e49f200345e903051"],
    });

    expect(data[0].id).toEqual("669e49f2003b4ed88818");
    expect(data[0].title).toEqual("Aut Cum Beatae");

    expect(data[1].id).toEqual("669e49f200345e903051");
    expect(data[1].title).toEqual("Quia Hic Nisi");
  });
});
