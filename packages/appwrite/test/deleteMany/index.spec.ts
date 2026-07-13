import { dataProvider } from "../../src";
import { client } from "../appwriteClient";
import "./index.mock";

describe("deleteMany", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).deleteMany!({
      resource: "blog_posts",
      ids: ["669e49f100329300407a", "669e49f1002d284f333d"],
    });

    expect(data[0].id).toEqual("669e49f100329300407a");
    expect(data[1].id).toEqual("669e49f1002d284f333d");
  });
});
