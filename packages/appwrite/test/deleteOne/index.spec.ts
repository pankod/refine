import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("deleteOne", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).deleteOne({
      resource: "blog_posts",
      id: "669e49f2000da6a5f6a6",
    });

    expect(data.id).toEqual("669e49f2000da6a5f6a6");
  });
});
