import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("update", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(client, {
      databaseId: "default",
    }).update({
      resource: "blog_posts",
      id: "669e49f3001cb7c76d6b",
      variables: {
        title: "Updated",
      },
    });

    expect(data.id).toEqual("669e49f3001cb7c76d6b");
    expect(data.title).toEqual("Updated");
  });
});
