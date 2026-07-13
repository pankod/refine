import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("useOne", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).getOne({
      resource: "blog_posts",
      id: "669e49f2003b4ed88818",
    });

    expect(data.id).toEqual("669e49f2003b4ed88818");
  });
});
